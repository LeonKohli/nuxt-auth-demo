<script setup lang="ts">
const { loggedIn, user } = useUserSession()
</script>

<template>
  <nav class="bg-gray-800 text-white p-4">
    <ul class="flex space-x-4">
      <li><NuxtLink to="/">Home</NuxtLink></li>
      <li v-if="loggedIn"><NuxtLink to="/profile">Profile</NuxtLink></li>
      <li v-if="loggedIn && user?.role === 'ADMIN'"><NuxtLink to="/admin">Admin</NuxtLink></li>
      <li v-if="!loggedIn"><NuxtLink to="/login">Login</NuxtLink></li>
      <li v-else><UButton @click="useUserSession().clear">Logout</UButton></li>
    </ul>
  </nav>
</template>