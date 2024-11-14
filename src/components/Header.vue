<template>
  <header
    class="w-full h-[70px] bg-slate-100 flex items-center justify-around border-b border-slate-200"
  >
    <p class="text-3xl font-semibold">{{ name }}</p>
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
  </header>
</template>

<script lang="ts">
import { routes } from '@/router'

export default {
  name: 'HeaderComponent',
  data() {
    return {
      name: 'App',
      routes: routes,
    }
  },
}
</script>
