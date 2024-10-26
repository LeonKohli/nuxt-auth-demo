<template>
  <NuxtLayout>
    <div class="min-h-screen bg-background text-foreground">
      <main class="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <NuxtPage />
      </main>
    </div>
  </NuxtLayout>
</template>

<style>
html {
  font-family: 'Inter', sans-serif;
}

body {
  @apply antialiased;
}
</style>
