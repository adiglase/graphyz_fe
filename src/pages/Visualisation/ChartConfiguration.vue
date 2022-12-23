<template>
  <div class="container row">
    <div class="data-preview-container">data preview</div>
    <div class="chart-configuration-container">
      <div class="chart-title q-mb-md">
        <q-input
          input-class="title-input"
          :input-style="{
            color: 'rgba(50, 71, 92, 0.8)',
            fontWeight: '600',
            fontSize: '26px',
          }"
          v-model="chartConfigurationData.title"
          label="Title"
        />
      </div>
      <div class="file-upload-container q-mb-lg">
        <q-file
          filled
          bottom-slots
          v-model="chartConfigurationData.dataFile"
          label="Upload data"
          counter
          dense
          accept=".xlsx"
        >
          <template #prepend>
            <q-icon name="cloud_upload" @click.stop.prevent />
          </template>
          <template #append>
            <q-icon
              name="close"
              @click.stop.prevent="chartConfigurationData.dataFile = null"
              class="cursor-pointer"
            />
          </template>

          <template #hint> Only accept .xlsx file </template>
          <template #after>
            <q-btn round dense flat icon="send" />
          </template>
        </q-file>
      </div>
      <div class="text-h7">SELECT COLUMNS TO VISUALIZE</div>
      <q-separator class="q-mb-sm"></q-separator>
      <ColumnConfigurationField
        :options="options"
        v-model="chartConfigurationData.label"
        label="Labels"
      ></ColumnConfigurationField>

      <ColumnConfigurationField
        :options="options"
        v-model="chartConfigurationData.values"
        label="Values"
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
import { ref, reactive } from "vue"
import ColumnConfigurationField from "./components/ColumnConfigurationField.vue"

const chartConfigurationData = reactive({
  title: "Untitled",
  dataFile: null,
  label: "",
  values: "",
})
const options = ref(["A", "B", "C", "D"])
</script>
<style lang="scss" scoped>
.container {
  display: grid;
  gap: 10px;
  grid-template-columns: 2fr 1fr;

  .data-preview-container,
  .chart-configuration-container {
    background-color: #fff;
    padding: 12px;
  }

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
}
</style>
