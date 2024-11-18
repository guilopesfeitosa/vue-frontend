<template>
  <input
    type="submit"
    :value="label"
    class="mt-4 px-4 py-1 rounded-sm bg-blue-500 text-white transition-all cursor-pointer hover:bg-blue-200"
  />
</template>

<script lang="ts">
export default {
  name: 'SubmitInput',
  props: {
    label: {
      type: String,
      required: true,
    },
  },
}
</script>
