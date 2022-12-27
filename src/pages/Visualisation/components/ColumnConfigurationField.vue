<template>
  <div class="column-selection-item row justify-between items-center q-mb-sm">
    <div class="description">{{ label }}</div>
    <div class="selection-field">
      <q-select
        filled
        dense
        square
        hide-bottom-space
        :model-value="modelValue"
        :options="options"
        @update:model-value="(val) => emit('update:modelValue', val)"
        :disable="isDisabled"
      />
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
  isDisabled: {
    type: Boolean,
    required: true,
  },
})
const emit = defineEmits(["update:modelValue"])
</script>
