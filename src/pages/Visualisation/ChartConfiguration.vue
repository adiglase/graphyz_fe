<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card flat bordered class="my-card bg-grey-1">
        <q-card-section>
          <div class="row items-center no-wrap">
            <div class="col">
              <div class="text-h6">Delete chart</div>
            </div>
          </div>
        </q-card-section>
        <q-card-section> Are you sure? </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn
            color="primary"
            :loading="isDeletingChart"
            label="OK"
            @click="onProceedDelete"
          />
          <q-btn color="primary" label="Cancel" @click="onDialogCancel" />
        </q-card-actions>
      </q-card>
    </q-card>
  </q-dialog>

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
          :model-value="chartDataConfiguration.title"
          @update:model-value="(val) => onValChange('title', val)"
          label="Title"
        />
      </div>
      <div class="file-upload-container q-mb-lg">
        <q-file
          filled
          bottom-slots
          v-model="dataFile"
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
        :value="chartDataConfiguration.label"
        @update-val="(val) => onValChange('label', val)"
        label="Labels"
        :is-disabled="isLoading"
      ></ColumnConfigurationField>

      <ColumnConfigurationField
        :options="valueOptions"
        :value="chartDataConfiguration.value"
        @update-val="(val) => onValChange('value', val)"
        label="Values"
        :is-disabled="isLoading"
      ></ColumnConfigurationField>

      <q-separator></q-separator>
      <q-btn
        @click="onDeleteChart"
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
import { computed, ref } from "vue"
import { useDebounceFn } from "@vueuse/core"
import { useDialogPluginComponent } from "quasar"
import { ChartsService } from "src/services/charts.service"
import { useRoute, useRouter } from "vue-router"
import { Notify } from "quasar"

const props = defineProps({
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
  chartDataConfiguration: {
    type: Object,
    required: true,
  },
  dataFile: {
    type: [Array, null],
    required: true,
  },
})

const emit = defineEmits([
  "updateChartConfiguration",
  "updateDataFile",
  ...useDialogPluginComponent.emits,
])

const router = useRouter()
const route = useRoute()
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent()

const isDeletingChart = ref(false)

const onValChange = useDebounceFn((field, value) => {
  emit("updateChartConfiguration", {
    ...props.chartDataConfiguration,
    [field]: value,
  })
}, 800)

const dataFile = computed({
  get: () => props.dataFile,
  set: (val) => emit("updateDataFile", val),
})

const onDeleteChart = () => {
  dialogRef.value.show()
}

const onProceedDelete = async () => {
  isDeletingChart.value = true
  try {
    await ChartsService.deleteChart(route.params.id)
    onDialogOK()
    await router.push({ name: "home" })
    Notify.create({
      type: "info",
      message: "Chart deleted successfully",
    })
  } catch (error) {
    console.log(error)
  }
  isDeletingChart.value = false
}
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
