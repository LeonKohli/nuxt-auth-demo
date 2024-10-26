<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})

const { user, loggedIn, clear } = useUserSession()
</script>

<template>
  <div class="min-h-screen px-4 py-16 bg-background text-foreground sm:px-6 lg:px-8 lg:py-24">
    <div class="max-w-4xl mx-auto">
      <div class="text-center">
        <h1 class="mb-6 text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
          Welcome to <span class="text-primary">Your App</span>
        </h1>
        <p class="max-w-2xl mx-auto mt-4 text-xl text-muted-foreground sm:text-2xl">
          Your personalized dashboard and starting point for all your needs.
        </p>
      </div>

      <div class="mt-12 sm:mt-16">
        <div v-if="loggedIn" class="w-full max-w-md mx-auto">
          <Card class="transition-shadow duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle class="text-2xl">Hello, {{ user?.name }}!</CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-lg text-muted-foreground">Welcome back to your personalized dashboard.</p>
            </CardContent>
            <CardFooter>
              <Button @click="clear" class="w-full py-3 text-lg">
                Logout
              </Button>
            </CardFooter>
          </Card>
        </div>
        <div v-else class="text-center">
          <Button asChild class="px-8 py-3 text-lg">
            <NuxtLink to="/login">
              Login to Get Started
            </NuxtLink>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
