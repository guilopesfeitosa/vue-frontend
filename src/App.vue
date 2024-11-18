<template>
  <Header />

  <main class="mx-auto max-w-5xl px-2 py-6">
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import Header from './components/Header.vue'
</script>
