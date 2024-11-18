<template>
  <header class="h-[70px] border-b border-slate-200 flex items-center">
    <div class="mx-auto max-w-5xl w-full flex items-center justify-between px-2">
      <p class="text-3xl font-semibold">Project</p>
      <nav class="flex items-center gap-4">
        <RouterLink
          v-for="route in routes"
          :key="route.path"
          :to="route.path"
          class="transition-all hover:text-blue-400"
        >
          {{ route.label }}
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import { routes } from '@/router'

export default {
  name: 'HeaderComponent',
  data() {
    return {
      routes,
    }
  },
}
</script>
