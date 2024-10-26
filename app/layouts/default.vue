<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />
    <main class="flex-grow">
      <slot />
    </main>
    <footer class="py-4 text-center text-sm text-muted-foreground">
      © {{ new Date().getFullYear() }} Your Company. All rights reserved.
    </footer>
  </div>
</template>

