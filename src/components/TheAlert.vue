<template>
  <q-card flat class="bg-negative text-white">
    <q-card-section>
      {{ message }}
    </q-card-section>
  </q-card>
</template>
<script setup>
defineProps({
  type: {
    validator(value) {
      return ["success", "warning", "danger", "info"].includes(value)
    },
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
})
</script>
<style lang="scss" scoped></style>
