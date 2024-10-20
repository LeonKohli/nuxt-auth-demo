<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})

const { user } = useUserSession()

// Debug information
console.log('User session:', user)

// Fetch additional user details for debugging
const { data: userDetails, error } = await useFetch('/api/user/details')
console.log('User details:', userDetails.value)
if (error.value) {
  console.error('Error fetching user details:', error.value)
}
</script>

<template>
  <div>
    <h1>User Profile</h1>
    <UCard>
      <template #header>
        <h3 class="text-lg font-semibold">{{ user?.name || 'N/A' }}</h3>
      </template>
      <p><strong>Email:</strong> {{ user?.email || 'N/A' }}</p>
      <p><strong>Role:</strong> {{ user?.role || 'N/A' }}</p>
      <p><strong>User ID:</strong> {{ user?.userId || 'N/A' }}</p>
    </UCard>

    <!-- Debug information -->
    <UCard class="mt-4">
      <template #header>
        <h3 class="text-lg font-semibold">Debug Information</h3>
      </template>
      <pre>{{ JSON.stringify(user, null, 2) }}</pre>
      <h4 class="mt-4 font-semibold">User Details:</h4>
      <pre>{{ JSON.stringify(userDetails, null, 2) }}</pre>
    </UCard>
  </div>
</template>