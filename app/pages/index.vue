<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})

const { user, loggedIn, clear } = useUserSession()
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="text-center">
        <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          Welcome to <span class="text-indigo-600">Your App</span>
        </h1>
        <p class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Your personalized dashboard and starting point for all your needs.
        </p>
      </div>

      <div class="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
        <div v-if="loggedIn" class="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-1 sm:gap-5">
          <div class="bg-white shadow sm:rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                Hello, {{ user?.name }}!
              </h3>
              <div class="mt-2 max-w-xl text-sm text-gray-500">
                <p>Welcome back to your personalized dashboard.</p>
              </div>
              <div class="mt-5">
                <button @click="clear" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-1 sm:gap-5">
          <NuxtLink to="/login" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Login to Get Started
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
