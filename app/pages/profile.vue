<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})

const { user } = useUserSession()
const { refreshSession } = useSessionRefresh()

const connectedAccounts = computed(() => {
  const accounts = []
  if (user.value?.googleId) accounts.push('Google')
  if (user.value?.githubId) accounts.push('GitHub')
  return accounts
})

const getAccountIcon = (account: string) => {
  switch (account) {
    case 'Google':
      return 'uil:google'
    case 'GitHub':
      return 'uil:github'
    default:
      return 'uil:user'
  }
}

const handleRoleChange = async (newRole: 'USER' | 'ADMIN') => {
  try {
    await $fetch('/api/user/change-role', {
      method: 'POST',
      body: { role: newRole }
    })
    await refreshSession()
  } catch (error) {
    console.error('Failed to change role:', error)
    // Handle error (e.g., show error message to user)
  }
}
</script>

<template>
  <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    <div class="px-4 py-6 sm:px-0">
      <h1 class="text-3xl font-bold text-gray-900 mb-6">User Profile</h1>

      <div class="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
        <div class="px-4 py-5 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">Personal Information</h3>
        </div>
        <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl class="sm:divide-y sm:divide-gray-200">
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Full name</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ user?.name || 'N/A' }}</dd>
            </div>
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Email address</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ user?.email || 'N/A' }}</dd>
            </div>
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Role</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ user?.role || 'N/A' }}</dd>
            </div>
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">User ID</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ user?.userId || 'N/A' }}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div class="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
        <div class="px-4 py-5 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">Connected OAuth Accounts</h3>
        </div>
        <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
          <ul v-if="connectedAccounts.length > 0" class="divide-y divide-gray-200">
            <li v-for="account in connectedAccounts" :key="account"
              class="py-4 flex items-center justify-between sm:px-6">
              <div class="flex items-center">
                <Icon :name="getAccountIcon(account)" class="h-6 w-6 text-gray-600" />
                <span class="ml-3 text-sm font-medium text-gray-900">{{ account }}</span>
              </div>
              <span class="ml-2 flex-shrink-0">
                <span
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Connected</span>
              </span>
            </li>
          </ul>
          <p v-else class="text-sm text-gray-500 py-4 sm:px-6">No connected OAuth accounts</p>
        </div>
      </div>

      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">Debug Information</h3>
        </div>
        <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
          <pre class="text-sm text-gray-700 p-4 sm:px-6 overflow-x-auto">{{ JSON.stringify(user, null, 2) }}</pre>
        </div>
      </div>

      <div class="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
        <div class="px-4 py-5 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">Role Management</h3>
        </div>
        <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
          <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Current Role</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ user?.role }}</dd>
          </div>
          <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Change Role</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <button @click="handleRoleChange('USER')"
                class="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Set as User
              </button>
              <button @click="handleRoleChange('ADMIN')"
                class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                Set as Admin
              </button>
            </dd>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
