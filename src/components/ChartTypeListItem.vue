<template>
  <div class="chart-type-item q-pa-md" @click="onClick">
    <div class="chart-type-icon">
      <q-img src="~assets/chart-types/bar-chart-type.svg" />
    </div>
    <div class="chart-type-name q-mt-md">Bar Chart</div>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router"

const router = useRouter()

const onClick = () => {
  router.push({ name: "visualization", params: { chartType: "bar-chart" } })
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
    line-height: 0;
  }
}
</style>
