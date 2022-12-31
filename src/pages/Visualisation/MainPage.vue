<template>
  <div class="container">
    <div class="page-navigation">
      <q-tabs v-model="tab" active-color="primary" indicator-color="primary">
        <q-tab name="configuration" label="Configuration" />
        <q-tab name="preview" label="Preview" />
      </q-tabs>
    </div>

    <div class="q-mt-md">
      <q-tab-panels v-model="tab" animated keep-alive>
        <q-tab-panel name="configuration">
          <ChartConfiguration
            :is-loading="isLoading"
            :label-options="labelOptions"
            :value-options="valueOptions"
            :data="dataFileInDict"
            :data-file="dataFile"
            :chart-data-configuration="chartDataConfiguration"
            @update-chart-configuration="onupdateChartDataConfiguration"
            @update-data-file="onUpdateDataFile"
          ></ChartConfiguration>
        </q-tab-panel>

        <q-tab-panel name="preview">
          <ChartPreview
            :chart-visualization="chartVisualization"
          ></ChartPreview>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, watch } from "vue"
import ChartConfiguration from "./ChartConfiguration.vue"
import ChartPreview from "./ChartPreview.vue"
import { ChartsService } from "src/services/charts.service"
import { useRoute } from "vue-router"

const route = useRoute()

const tab = ref("preview")
const isLoading = ref(false)
// chart data conf //
const chartDataConfiguration = ref({
  title: "",
  label: "",
  value: "",
})
const dataFile = ref(null)
const labelOptions = ref([])
const valueOptions = ref([])
const dataFileInDict = ref([])
const chartVisualization = ref(null)
// ================ //

const onupdateChartDataConfiguration = async (newVal) => {
  isLoading.value = true

  const formData = new FormData()
  Object.keys(newVal).forEach((key) => {
    formData.append(key, newVal[key] || "")
  })

  await updateChartConf(formData)

  isLoading.value = false
}

const onUpdateDataFile = async (newVal) => {
  const formData = new FormData()
  formData.append("data_file", newVal)

  isLoading.value = true

  await updateChartConf(formData)
  await getDataFileDict()

  isLoading.value = false
}

const getChartData = async () => {
  const id = route.params.id

  try {
    const { data } = await ChartsService.getChart(id)
    chartDataConfiguration.value.title = data.title
    chartDataConfiguration.value.label = data.label
    chartDataConfiguration.value.value = data.value

    labelOptions.value = data.column_configuration_options
    valueOptions.value = data.column_configuration_options

    chartVisualization.value = data.chart_visualization
  } catch (error) {
    console.log(error)
  }
}

const getDataFileDict = async () => {
  try {
    const { data } = await ChartsService.getDataFileInDict(route.params.id)
    dataFileInDict.value = data
  } catch (error) {
    console.log(error)
  }
}

const updateChartConf = async (formData) => {
  try {
    const { data } = await ChartsService.updateChart(route.params.id, formData)
    chartDataConfiguration.value.title = data.title
    chartDataConfiguration.value.label = data.label
    chartDataConfiguration.value.value = data.value

    labelOptions.value = data.column_configuration_options
    valueOptions.value = data.column_configuration_options

    chartVisualization.value = data.chart_visualization
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  isLoading.value = true
  await getChartData()
  await getDataFileDict()

  isLoading.value = false
})
</script>
<style lang="scss" scoped>
.page-navigation {
  margin: 0 auto;
  width: fit-content;
  background-color: #fff;
}
.q-tab-panels {
  background-color: initial;
}
.q-tab-panel {
  padding: 0;
}
</style>
