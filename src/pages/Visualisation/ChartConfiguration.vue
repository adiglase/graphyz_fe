<template>
  <div class="container row">
    <div class="data-preview-container">
      <q-spinner color="primary" size="3em" v-if="isLoading" />
      <ChartDataView
        :is-loading="isLoading"
        :data="data"
        v-else
      ></ChartDataView>
    </div>
    <div class="chart-configuration-container">
      <q-inner-loading :showing="isLoading">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
      <div class="chart-title q-mb-md">
        <q-input
          input-class="title-input"
          :input-style="{
            color: 'rgba(50, 71, 92, 0.8)',
            fontWeight: '600',
            fontSize: '26px',
          }"
          v-model="chartDataConfiguration.title"
          label="Title"
        />
      </div>
      <div class="file-upload-container q-mb-lg">
        <q-file
          filled
          bottom-slots
          v-model="chartDataConfiguration.data_file"
          label="Upload data"
          counter
          dense
          accept=".xlsx"
          :disable="isLoading"
        >
          <template #prepend>
            <q-icon name="cloud_upload" @click.stop.prevent />
          </template>
          <template #hint> Only accept .xlsx file </template>
        </q-file>
      </div>
      <div class="text-h7">SELECT COLUMNS TO VISUALIZE</div>
      <q-separator class="q-mb-sm"></q-separator>
      <ColumnConfigurationField
        :options="labelOptions"
        v-model="chartDataConfiguration.label"
        label="Labels"
        :is-disabled="isLoading"
      ></ColumnConfigurationField>

      <ColumnConfigurationField
        :options="valueOptions"
        v-model="chartDataConfiguration.value"
        label="Values"
        :is-disabled="isLoading"
      ></ColumnConfigurationField>

      <q-separator></q-separator>
      <q-btn
        class="q-mt-md"
        unelevated
        color="red"
        icon="delete"
        label="Delete Chart"
      />
    </div>
  </div>
</template>
<script setup>
import ColumnConfigurationField from "./components/ColumnConfigurationField.vue"
import ChartDataView from "./ChartDataView.vue"
import { computed } from "vue"

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
  isLoading: {
    type: Boolean,
    required: true,
  },
  labelOptions: {
    type: Array,
    required: true,
  },
  valueOptions: {
    type: Array,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(["update:modelValue"])

const chartDataConfiguration = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
})
</script>
<style lang="scss" scoped>
.container {
  display: grid;
  gap: 10px;
  grid-template-columns: 2fr 1fr;

  .data-preview-container,
  .chart-configuration-container {
    position: relative;
    background-color: #fff;
    padding: 12px;
    max-height: 550px;
  }

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
}
</style>
