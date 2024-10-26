<template>
  <NuxtLayout>
    <div class="min-h-screen bg-gray-50">
      <Navbar />
      <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
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
  @apply antialiased text-gray-900;
}
</style>
