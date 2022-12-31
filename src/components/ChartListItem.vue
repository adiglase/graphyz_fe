<template>
  <router-link
    :to="{
      name: 'visualization',
      params: { chartType: chartType, id: chartId },
    }"
  >
    <div class="chart-list-item q-pa-md">
      <div class="chart-type-icon">
        <q-img :src="iconUrl" />
      </div>
      <div class="chart-name q-mt-md">{{ chartName }}</div>
    </div>
  </router-link>
</template>
<script setup>
const props = defineProps({
  chartId: {
    type: String,
    required: true,
  },
  chartName: {
    type: String,
    required: true,
  },
  iconUrl: {
    type: String,
    required: true,
  },
  chartType: {
    type: String,
    required: true,
  },
})
</script>
<style lang="scss" scoped>
.chart-list-item {
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
      height: 70px;
    }
  }
  .chart-name {
    font-weight: 500;
    font-size: 16px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}
</style>
