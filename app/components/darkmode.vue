<script setup lang="ts">
const colorMode = useColorMode()

const currentIcon = computed(() => {
  switch (colorMode.value) {
    case 'light':
      return 'radix-icons:sun'
    case 'dark':
      return 'radix-icons:moon'
    default:
      return 'radix-icons:mix'
  }
})
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline" size="icon" class="w-10 h-10">
        <Icon :name="currentIcon" class="w-5 h-5" />
        <span class="sr-only">Toggle theme</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-36">
      <DropdownMenuItem @click="colorMode.preference = 'light'" class="cursor-pointer">
        <Icon name="radix-icons:sun" class="w-4 h-4 mr-2" />
        Light
      </DropdownMenuItem>
      <DropdownMenuItem @click="colorMode.preference = 'dark'" class="cursor-pointer">
        <Icon name="radix-icons:moon" class="w-4 h-4 mr-2" />
        Dark
      </DropdownMenuItem>
      <DropdownMenuItem @click="colorMode.preference = 'system'" class="cursor-pointer">
        <Icon name="radix-icons:mix" class="w-4 h-4 mr-2" />
        System
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
