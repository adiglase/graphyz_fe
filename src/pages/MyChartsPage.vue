<template>
  <q-spinner color="primary" size="3em" v-if="isLoading" />
  <div class="chart-types-container" v-else>
    <ChartListItem
      v-for="chart in chartList"
      :key="chart.id"
      :chart-id="chart.id"
      :chart-name="chart.title"
      :chart-type="chart.chart_type"
      :icon-url="chart.icon"
    ></ChartListItem>
  </div>
  <div v-if="!isLoading && !chartList.length">You have no chart</div>
</template>
<script setup>
import ChartListItem from "src/components/ChartListItem.vue"
import { onMounted, ref } from "vue"
import { ChartsService } from "src/services/charts.service"

const isLoading = ref(false)
const chartList = ref([])

onMounted(async () => {
  isLoading.value = true
  try {
    const { data } = await ChartsService.getUserChartList()
    chartList.value = data
  } catch (e) {
    console.log(e)
  } finally {
    isLoading.value = false
  }
})
</script>
<style scoped lang="scss">
.chart-types-container {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
}
</style>
