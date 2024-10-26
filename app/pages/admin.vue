// File: app/pages/admin.vue

<script setup lang="ts">
definePageMeta({
  middleware: ['auth', 'admin']
})

// Fetch users from the API
const { data: users } = await useFetch('/api/users')

const userRoleColors = {
  ADMIN: 'bg-red-100 text-red-800',
  USER: 'bg-green-100 text-green-800',
  default: 'bg-gray-100 text-gray-800'
}

const getUserRoleColor = (role: string) => {
  return userRoleColors[role] || userRoleColors.default
}
</script>

<template>
  <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    <div class="px-4 py-6 sm:px-0">
      <h1 class="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>

      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">User List</h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">Detailed information about all users.</p>
        </div>
        <div class="border-t border-gray-200">
          <ul class="divide-y divide-gray-200">
            <li v-for="user in users" :key="user.id" class="px-4 py-4 sm:px-6">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <img class="h-10 w-10 rounded-full"
                      :src="`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`"
                      :alt="user.name">
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">
                      {{ user.name }}
                    </div>
                    <div class="text-sm text-gray-500">
                      {{ user.email }}
                    </div>
                  </div>
                </div>
                <div class="ml-2 flex-shrink-0">
                  <span
                    :class="[getUserRoleColor(user.role), 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full']">
                    {{ user.role }}
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
