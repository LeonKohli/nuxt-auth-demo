// File: app/pages/auth/verify.vue

<script setup lang="ts">
const route = useRoute()
const email = route.query.email as string

const state = reactive<{ otp: string }>({ otp: '' })
const error = ref('')

const form = ref<HTMLFormElement | null>(null)

const send = async ({ data }: { data: { otp: string } }) => {
  try {
    const response = await $fetch<{ success: boolean; error?: string }>('/api/auth/verify/otp', {
      method: 'POST',
      body: {
        email,
        otp: data.otp,
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
  <UForm
    ref="form"
    :state="state"
    class="space-y-4 max-w-2xl"
    @submit="send"
  >
    <UFormGroup
      label="One-time password"
      name="otp"
    >
      <UInput
        v-model="state.otp"
        size="xl"
        maxlength="6"
        :ui="{ base: 'text-center tracking-[0.75em]' }"
      />
    </UFormGroup>
    <div v-if="error" class="text-red-600 text-sm">{{ error }}</div>
    <div class="text-center">
      <UButton type="submit">
        Login
      </UButton>
    </div>
  </UForm>
</template>
