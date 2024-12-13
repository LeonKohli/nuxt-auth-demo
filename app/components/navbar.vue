<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

const { loggedIn, user } = useUserSession()
const router = useRouter()
const route = useRoute()

const handleLogout = async () => {
  await useUserSession().clear()
  router.push('/')
}

const isActive = (path: string) => {
  return route.path === path
}

const userComponents: { title: string, href: string, description: string, enabled: boolean }[] = [
  {
    title: 'Profile',
    href: '/profile',
    description: 'View and edit your personal profile information.',
    enabled: true
  },
  {
    title: 'Settings',
    href: '/settings',
    description: 'Manage your account settings and preferences.',
    enabled: false
  },
  {
    title: 'Dashboard',
    href: '/dashboard',
    description: 'Access your personalized dashboard with key information.',
    enabled: false
  },
]

const adminComponents: { title: string, href: string, description: string, enabled: boolean }[] = [
  {
    title: 'Admin Dashboard',
    href: '/admin',
    description: 'Access the admin dashboard.',
    enabled: true
  },
  {
    title: 'User Management',
    href: '/admin/users',
    description: 'Manage user accounts and permissions.',
    enabled: false
  },
  {
    title: 'Content Management',
    href: '/admin/content',
    description: 'Create, edit, and organize site content.',
    enabled: false
  },
  {
    title: 'Analytics',
    href: '/admin/analytics',
    description: 'View detailed site analytics and reports.',
    enabled: false
  },
]

const isMobileMenuOpen = ref(false)
</script>

<template>
  <header class="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
    <div class="container flex items-center h-16">
      <div class="flex items-center mr-4 space-x-4">
        <NuxtLink to="/" class="flex items-center space-x-2">
          <Icon name="logos:nuxt-icon" class="w-8 h-8" />
        </NuxtLink>
        <NavigationMenu class="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink :href="'/'"
                :class="[navigationMenuTriggerStyle(), isActive('/') ? 'text-foreground' : 'text-foreground/80']">
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem v-if="loggedIn">
              <NavigationMenuTrigger>User Menu</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul class="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <li v-for="component in userComponents" :key="component.title">
                    <NavigationMenuLink as-child>
                      <NuxtLink v-if="component.enabled" :to="component.href"
                        class="block p-3 space-y-1 leading-none transition-colors rounded-md outline-none select-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div class="text-sm font-medium leading-none">{{ component.title }}</div>
                        <p class="text-sm leading-snug line-clamp-2 text-muted-foreground">
                          {{ component.description }}
                        </p>
                      </NuxtLink>
                      <div v-else
                        class="block p-3 space-y-1 leading-none rounded-md outline-none opacity-50 cursor-not-allowed select-none">
                        <div class="text-sm font-medium leading-none">{{ component.title }}</div>
                        <p class="text-sm leading-snug line-clamp-2 text-muted-foreground">
                          {{ component.description }}
                        </p>
                      </div>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem v-if="loggedIn && user?.role === 'ADMIN'">
              <NavigationMenuTrigger>Admin</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul class="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <li v-for="component in adminComponents" :key="component.title">
                    <NavigationMenuLink as-child>
                      <NuxtLink v-if="component.enabled" :to="component.href"
                        class="block p-3 space-y-1 leading-none transition-colors rounded-md outline-none select-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div class="text-sm font-medium leading-none">{{ component.title }}</div>
                        <p class="text-sm leading-snug line-clamp-2 text-foreground/80">
                          {{ component.description }}
                        </p>
                      </NuxtLink>
                      <div v-else
                        class="block p-3 space-y-1 leading-none rounded-md outline-none opacity-50 cursor-not-allowed select-none">
                        <div class="text-sm font-medium leading-none">{{ component.title }}</div>
                        <p class="text-sm leading-snug line-clamp-2 text-foreground/80">
                          {{ component.description }}
                        </p>
                      </div>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div class="flex items-center justify-end flex-1 space-x-4">
        <ClientOnly>
          <darkmode />
        </ClientOnly>
        <div v-if="!loggedIn" class="hidden md:block">
          <Button variant="outline" asChild>
            <NuxtLink to="/login">Login</NuxtLink>
          </Button>
        </div>
        <div v-else class="hidden md:block">
          <Button variant="outline" @click="handleLogout">
            Logout
          </Button>
        </div>
        <ClientOnly>
          <Sheet v-model:open="isMobileMenuOpen">
            <SheetTrigger class="md:hidden">
              <Button variant="outline" size="icon">
                <Icon name="uil:bars" class="w-4 h-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" class="w-[300px] sm:w-[400px]">
              <SheetTitle class="sr-only">Mobile Navigation Menu</SheetTitle>
              <nav class="flex flex-col mt-4">
                <NuxtLink to="/" class="py-2 text-lg" @click="isMobileMenuOpen = false">Home</NuxtLink>
                <template v-if="loggedIn">
                  <template v-for="component in userComponents" :key="component.title">
                    <NuxtLink v-if="component.enabled" :to="component.href" class="py-2 text-lg"
                      @click="isMobileMenuOpen = false">
                      {{ component.title }}
                    </NuxtLink>
                    <div v-else class="py-2 text-lg opacity-50 cursor-not-allowed">
                      {{ component.title }}
                    </div>
                  </template>
                  <template v-if="user?.role === 'ADMIN'">
                    <template v-for="component in adminComponents" :key="component.title">
                      <NuxtLink v-if="component.enabled" :to="component.href" class="py-2 text-lg"
                        @click="isMobileMenuOpen = false">
                        {{ component.title }}
                      </NuxtLink>
                      <div v-else class="py-2 text-lg opacity-50 cursor-not-allowed">
                        {{ component.title }}
                      </div>
                    </template>
                  </template>
                  <Button variant="outline" @click="handleLogout" class="mt-4">Logout</Button>
                </template>
                <template v-else>
                  <Button variant="outline" asChild class="mt-4">
                    <NuxtLink to="/login" @click="isMobileMenuOpen = false">Login</NuxtLink>
                  </Button>
                </template>
              </nav>
            </SheetContent>
          </Sheet>
        </ClientOnly>
      </div>
    </div>
  </header>
</template>
