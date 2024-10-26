// File: app/pages/auth/verify.vue

<script setup lang="ts">
const route = useRoute()
const email = route.query.email as string

const otp = ref('')
const error = ref('')

const send = async () => {
  try {
    const response = await $fetch<{ success: boolean; error?: string }>('/api/auth/verify/otp', {
      method: 'POST',
      body: {
        email,
        otp: otp.value,
      },
    })

    if (!response.success) {
      error.value = response.error || 'Verification failed. Please try again.'
      console.error('Authentication failed:', response.error)
      return
    }

    const loginRedirect = useCookie<string | null>('loginRedirect', {
      maxAge: 60 * 60 * 24,
    })
    const redirectTo = loginRedirect.value || '/'
    loginRedirect.value = null
    await navigateTo(redirectTo, { external: true })
  } catch (err) {
    console.error('Verification error:', err)
    error.value = 'An unexpected error occurred. Please try again.'
  }
}
</script>

<template>
  <form @submit.prevent="send" class="space-y-4 max-w-2xl">
    <div>
      <label for="otp" class="block text-sm font-medium text-gray-700">One-time password</label>
      <input
        id="otp"
        v-model="otp"
        type="text"
        maxlength="6"
        class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-center tracking-[0.75em]"
      />
    </div>
    <div v-if="error" class="text-red-600 text-sm">{{ error }}</div>
    <div class="text-center">
      <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Login
      </button>
    </div>
  </form>
</template>
