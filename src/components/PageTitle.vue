<template>
  <h1 class="text-3xl text-center font-bold mb-8 text-blue-500">{{ title }}</h1>
</template>

<script lang="ts">
export default {
  name: 'PageTitle',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
}
</script>
