// File: app/pages/login.vue

<script setup lang="ts">
import { ref } from 'vue'

const providers = [
  {
    label: 'GitHub',
    icon: 'i-simple-icons-github',
    color: 'gray',
    click: async () => {
      await navigateTo('/auth/github', { external: true })
    },
  },
  {
    label: 'Google',
    icon: 'i-simple-icons-google',
    color: 'red',
    click: async () => {
      await navigateTo('/auth/google', { external: true })
    },
  }
]

const email = ref('')
const error = ref('')

const validate = (): boolean => {
  if (!email.value) {
    error.value = 'Please enter your email address'
    return false
  }
  error.value = ''
  return true
}

const send = async () => {
  if (!validate()) return

  try {
    const response = await $fetch('/api/auth/email/login', {
      method: 'POST',
      body: { email: email.value },
    })

    if (!response.success) {
      error.value = response.error || 'Login failed. Please try again.'
      return
    }

    await navigateTo({ path: '/auth/verify', query: { email: email.value } }, { replace: true })
  } catch (err) {
    console.error('Login error:', err)
    error.value = 'An unexpected error occurred. Please try again.'
  }
}
</script>

<template>
  <UCard class="max-w-md mx-auto">
    <div class="space-y-6">
      <h2 class="text-3xl font-bold text-center">Login</h2>
      <p class="text-gray-600 text-center">Send magic link and one-time password</p>
      
      <form @submit.prevent="send" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            placeholder="Enter your email"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
        </div>
        
        <div v-if="error" class="text-red-600 text-sm">{{ error }}</div>
        
        <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out">
          <span class="mr-2">Send</span>
          <span class="i-heroicons-envelope-20-solid"></span>
        </button>
      </form>
      
      <div class="relative">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-300"></div>
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>
      
      <div class="grid grid-cols-2 gap-3">
        <button
          v-for="provider in providers"
          :key="provider.label"
          @click="provider.click"
          class="flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
        >
          <span :class="[provider.icon, `text-${provider.color}-500`]" class="mr-2"></span>
          {{ provider.label }}
        </button>
      </div>
    </div>
  </UCard>
</template>
