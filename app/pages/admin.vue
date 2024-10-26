<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

definePageMeta({
  middleware: ['auth', 'admin']
})

// Fetch users from the API
const { data: users } = await useFetch('/api/users')

const userRoleColors = {
  ADMIN: 'bg-destructive text-destructive-foreground',
  USER: 'bg-primary text-primary-foreground',
  default: 'bg-secondary text-secondary-foreground'
}

const getUserRoleColor = (role: string) => {
  return userRoleColors[role] || userRoleColors.default
}
</script>

<template>
  <div class="max-w-3xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
    <h1 class="mb-8 text-3xl font-bold">Admin Dashboard</h1>

    <Card class="mb-8">
      <CardHeader>
        <CardTitle class="text-2xl">User Management</CardTitle>
        <CardDescription>View all users in the system</CardDescription>
      </CardHeader>
      <CardContent>
        <ul class="space-y-6">
          <li v-for="user in users" :key="user.id" class="p-4 transition-colors rounded-md hover:bg-muted">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <Avatar class="w-12 h-12 mr-4">
                  <AvatarImage :src="`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`" :alt="user.name" />
                  <AvatarFallback>{{ user.name.charAt(0) }}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 class="text-lg font-semibold">{{ user.name }}</h2>
                  <p class="text-sm text-muted-foreground">{{ user.email }}</p>
                </div>
              </div>
              <div class="flex items-center">
                <Badge :class="getUserRoleColor(user.role)">
                  {{ user.role }}
                </Badge>
              </div>
            </div>
          </li>
        </ul>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle class="text-2xl">System Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <dl class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <dt class="font-medium text-muted-foreground">Total Users</dt>
            <dd class="text-2xl font-semibold">{{ users?.length || 0 }}</dd>
          </div>
          <div>
            <dt class="font-medium text-muted-foreground">Admins</dt>
            <dd class="text-2xl font-semibold">{{ users?.filter(u => u.role === 'ADMIN').length || 0 }}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  </div>
</template>
