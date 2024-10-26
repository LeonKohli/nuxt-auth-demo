<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

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

const getRoleBadgeClass = (role: string) => {
  switch (role) {
    case 'ADMIN':
      return 'bg-destructive text-destructive-foreground'
    case 'USER':
      return 'bg-primary text-primary-foreground'
    default:
      return 'bg-secondary text-secondary-foreground'
  }
}
</script>

<template>
  <div class="max-w-3xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
    <h1 class="mb-8 text-3xl font-bold">User Profile</h1>

    <Card class="mb-8">
      <CardHeader>
        <CardTitle class="text-2xl">Personal Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="flex items-center mb-6">
          <Avatar class="w-16 h-16 mr-4">
            <AvatarImage :src="`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || '')}&background=random`" :alt="user?.name" />
            <AvatarFallback>{{ user?.name?.charAt(0) || 'U' }}</AvatarFallback>
          </Avatar>
          <div>
            <h2 class="text-xl font-semibold">{{ user?.name || 'N/A' }}</h2>
            <p class="text-muted-foreground">{{ user?.email || 'N/A' }}</p>
          </div>
        </div>
        <dl class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <dt class="font-medium text-muted-foreground">Role</dt>
            <dd>
              <Badge :class="getRoleBadgeClass(user?.role)">
                {{ user?.role || 'N/A' }}
              </Badge>
            </dd>
          </div>
          <div>
            <dt class="font-medium text-muted-foreground">User ID</dt>
            <dd>{{ user?.userId || 'N/A' }}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>

    <Card class="mb-8">
      <CardHeader>
        <CardTitle class="text-2xl">Connected Accounts</CardTitle>
      </CardHeader>
      <CardContent>
        <ul v-if="connectedAccounts.length > 0" class="space-y-3">
          <li v-for="account in connectedAccounts" :key="account"
            class="flex items-center justify-between p-3 rounded-md bg-muted">
            <div class="flex items-center">
              <Icon :name="getAccountIcon(account)" class="w-6 h-6 mr-3" />
              <span class="font-medium">{{ account }}</span>
            </div>
            <Badge variant="secondary">Connected</Badge>
          </li>
        </ul>
        <p v-else class="text-muted-foreground">No connected accounts</p>
      </CardContent>
    </Card>

    <Card class="mb-8">
      <CardHeader>
        <CardTitle class="text-2xl">Role Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="font-medium">Current Role</span>
            <Badge :class="getRoleBadgeClass(user?.role)">{{ user?.role }}</Badge>
          </div>
          <div class="flex justify-end space-x-3">
            <Button @click="handleRoleChange('USER')" variant="outline" size="sm">
              Set as User
            </Button>
            <Button @click="handleRoleChange('ADMIN')" variant="outline" size="sm">
              Set as Admin
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle class="text-2xl">Debug Information</CardTitle>
      </CardHeader>
      <CardContent>
        <pre class="p-4 overflow-x-auto text-sm rounded-md bg-muted">{{ JSON.stringify(user, null, 2) }}</pre>
      </CardContent>
    </Card>
  </div>
</template>
