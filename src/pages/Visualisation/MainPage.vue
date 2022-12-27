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
            v-model="chartDataConfiguration"
            :is-loading="isLoading"
            :label-options="labelOptions"
            :value-options="valueOptions"
            :data="dataFileInDict"
          ></ChartConfiguration>
        </q-tab-panel>

        <q-tab-panel name="preview">
          <ChartPreview></ChartPreview>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue"
import ChartConfiguration from "./ChartConfiguration.vue"
import ChartPreview from "./ChartPreview.vue"
import { watchDebounced } from "@vueuse/core"
import { ChartsService } from "src/services/charts.service"
import { useRoute } from "vue-router"

const route = useRoute()

const tab = ref("configuration")
const chartDataConfiguration = ref({
  title: "",
  data_file: null,
  label: "",
  value: "",
})
const labelOptions = ref(["A", "B", "C", "D"])
const valueOptions = ref(["A", "B", "C", "D"])

const dataFileInDict = ref([])

const isLoading = ref(true)

const runChartDataConfigurationWatcher = () => {
  return watchDebounced(
    chartDataConfiguration.value,
    (newVal) => {
      if (!isLoading.value) {
        // to prevent watcher run after fetching data on initial load
        const formData = new FormData()
        for (const key in newVal) {
          // only send update to data_file there is a value
          // so it will not overwrite the data_file value if we only update other field
          // data_file value is mean to be only can be updated, can't be deleted
          if (key === "data_file" && !newVal[key]) continue
          formData.append(key, newVal[key] || "")
        }

        sendUpdatedChartConf(formData)
      }
    },
    { debounce: 1000, immediate: false }
  )
}

const getChartData = async () => {
  isLoading.value = true
  const id = route.params.id

  try {
    const { data } = await ChartsService.getChart(id)
    chartDataConfiguration.value.title = data.title
    chartDataConfiguration.value.data_file = data.data_file
    chartDataConfiguration.value.label = data.label
    chartDataConfiguration.value.value = data.value

    // only run watcher after the initial data already fetched
    runChartDataConfigurationWatcher()
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}
getChartData()

const getDataFileDict = async () => {
  try {
    const { data } = await ChartsService.getDataFileInDict(route.params.id)
    dataFileInDict.value = data
  } catch (error) {
    console.log(error)
  }
}
getDataFileDict()

const sendUpdatedChartConf = async (formData) => {
  isLoading.value = true
  try {
    const { data } = await ChartsService.updateChart(route.params.id, formData)
    await getDataFileDict()
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}
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
