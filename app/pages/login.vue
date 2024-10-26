// File: app/pages/login.vue

<script setup lang="ts">
const providers = [
  {
    label: 'GitHub',
    icon: 'uil:github',
    click: async () => {
      await navigateTo('/auth/github', { external: true })
    },
  },
  {
    label: 'Google',
    icon: 'uil:google',
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
  <div class="flex items-center justify-center min-h-screen px-4 py-12 bg-background text-foreground sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8">
      <div>
        <h2 class="mt-6 text-3xl font-extrabold text-center">Sign in to your account</h2>
        <p class="mt-2 text-sm text-center text-muted-foreground">
          Or start your 14-day free trial
        </p>
      </div>
      <form @submit.prevent="send" class="mt-8 space-y-6">
        <div class="-space-y-px rounded-md shadow-sm">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <Input id="email-address" v-model="email" name="email" type="email" autocomplete="email" required
              class="relative block w-full px-3 py-2"
              placeholder="Email address"/>
          </div>
        </div>

        <div v-if="error" class="text-sm text-center text-destructive">{{ error }}</div>

        <div>
          <Button type="submit"
            class="relative flex justify-center w-full px-4 py-2">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <Icon name="uil:envelope" class="w-5 h-5"
                aria-hidden="true" />
            </span>
            Send Magic Link
          </Button>
        </div>
      </form>

      <div class="mt-6">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-border"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-background text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3 mt-6">
          <div v-for="provider in providers" :key="provider.label">
            <Button @click="provider.click" :class="[
              'w-full inline-flex justify-center py-2 px-4'
            ]">
              <Icon :name="provider.icon" class="w-5 h-5" />
              <span class="ml-2">{{ provider.label }}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
