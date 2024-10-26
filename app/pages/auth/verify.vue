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
  <form @submit.prevent="send" class="max-w-2xl space-y-4">
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
    <div v-if="error" class="text-sm text-red-600">{{ error }}</div>
    <div class="text-center">
      <Button type="submit" class="w-full">
        Login
      </Button>
    </div>
  </form>
</template>
