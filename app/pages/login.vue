// File: app/pages/login.vue

<script setup lang="ts">
const providers = [
  {
    label: 'GitHub',
    icon: 'uil:github',
    color: 'bg-gray-800 hover:bg-gray-900',
    textColor: 'text-white',
    click: async () => {
      await navigateTo('/auth/github', { external: true })
    },
  },
  {
    label: 'Google',
    icon: 'uil:google',
    color: 'bg-white hover:bg-gray-100',
    textColor: 'text-gray-700',
    borderColor: 'border-gray-300',
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
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or start your 14-day free trial
        </p>
      </div>
      <form @submit.prevent="send" class="mt-8 space-y-6">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input id="email-address" v-model="email" name="email" type="email" autocomplete="email" required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address">
          </div>
        </div>

        <div v-if="error" class="text-red-600 text-sm text-center">{{ error }}</div>

        <div>
          <button type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <Icon name="uil:envelope" class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                aria-hidden="true" />
            </span>
            Send Magic Link
          </button>
        </div>
      </form>

      <div class="mt-6">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-gray-50 text-gray-500">Or continue with</span>
          </div>
        </div>

        <div class="mt-6 grid grid-cols-2 gap-3">
          <div v-for="provider in providers" :key="provider.label">
            <button @click="provider.click" :class="[
              provider.color,
              provider.textColor,
              provider.borderColor,
              'w-full inline-flex justify-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            ]">
              <Icon :name="provider.icon" class="w-5 h-5" />
              <span class="ml-2">{{ provider.label }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
