<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})

const { user, loggedIn, clear } = useUserSession()
</script>

<template>
  <div>
    <h1>Welcome to the Home Page</h1>
    <p v-if="loggedIn">Hello, {{ user?.name }}!</p>
    <p v-else>Please log in to see personalized content.</p>
    <UButton v-if="loggedIn" @click="clear">Logout</UButton>
    <UButton v-else to="/login">Login</UButton>
  </div>
</template>