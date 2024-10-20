// File: app/pages/admin.vue

<script setup lang="ts">
definePageMeta({
  middleware: ['auth', 'admin']
})

// Fetch users from the API
const { data: users } = await useFetch('/api/users')
</script>

<template>
  <div>
    <h1>Admin Dashboard</h1>
    <UCard>
      <template #header>
        <h3 class="text-lg font-semibold">User List</h3>
      </template>
      <ul>
        <li v-for="user in users" :key="user.id">
          {{ user.name }} ({{ user.email }}) - {{ user.role }}
        </li>
      </ul>
    </UCard>
  </div>
</template>