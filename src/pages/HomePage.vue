<template>
  <div class="home-title q-pa-md q-mb-md">
    <div class="description">
      <h2 class="text-primary block">Create new chart</h2>

      <p>
        Pick the chart types that you want to create. <br />
        Then start to visualize your data.
      </p>
    </div>

    <div class="illustration">
      <q-img
        alt="Working on data with computer"
        src="~assets/working-with-data-illustration.svg"
      />
    </div>
  </div>
  <q-spinner color="primary" size="3em" v-if="isLoading" />
  <div class="chart-types-container" v-else>
    <ChartTypeListItem
      v-for="chartType in chartTypes"
      :key="chartType.id"
      :chart-type-id="chartType.id"
      :name="chartType.name"
      :icon-url="chartType.icon"
    ></ChartTypeListItem>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import ChartTypeListItem from "src/components/ChartTypeListItem.vue"
import { ChartsService } from "src/services/charts.service"

const chartTypes = ref([])
const isLoading = ref(false)

onMounted(async () => {
  try {
    const { data } = await ChartsService.getChartTypeList()
    chartTypes.value = data
  } catch (e) {
    console.log(e)
  } finally {
    isLoading.value = false
  }
})
</script>
<style lang="scss" scoped>
.home-title {
  position: relative;
  background-color: #fff;
  border-radius: $card-border-radius;
  display: flex;
  justify-content: space-between;

  .description {
    h2 {
      line-height: 0;
      font-size: 24px;
      font-weight: 500;
      margin-bottom: 30px;
    }
    p {
      font-size: 16px;
      color: $second-font-color;
    }
  }
  .illustration {
    position: absolute;
    right: 0;
    top: -25px;
    .q-img {
      width: 200px;
    }
  }
}

.chart-types-container {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
}
</style>
