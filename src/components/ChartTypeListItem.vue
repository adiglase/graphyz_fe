<template>
  <div class="chart-type-item q-pa-md" @click="onClick">
    <div class="chart-type-icon">
      <q-img :src="iconUrl" v-if="!isLoading" />
      <q-spinner color="primary" size="3em" v-else />
    </div>
    <div class="chart-type-name q-mt-md">{{ name }}</div>
  </div>
</template>
<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { ChartsService } from "src/services/charts.service"

const router = useRouter()

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  iconUrl: {
    type: String,
    required: true,
  },
  chartTypeId: {
    type: String,
    required: true,
  },
})

const isLoading = ref(false)

const onClick = async () => {
  try {
    isLoading.value = true
    const { data } = await ChartsService.createChart({
      chart_type: props.chartTypeId,
    })
    router.push({
      name: "visualization",
      params: {
        chartType: data.chart_type,
        id: data.id,
      },
    })
  } catch (e) {
    console.log(e.message)
  } finally {
    isLoading.value = false
  }
}
</script>
<style lang="scss" scoped>
.chart-type-item {
  cursor: pointer;
  background-color: #fff;
  border-radius: $card-border-radius;
  padding: 16px;
  text-align: center;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }

  .chart-type-icon {
    .q-img {
      width: 70px;
    }
  }
  .chart-type-name {
    font-weight: 500;
    font-size: 16px;
  }
}
</style>
