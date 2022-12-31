<template>
  <div class="preview-container">
    <div v-if="!chartVisualization">No chart/not configured</div>
    <div ref="plot" class="graph-container"></div>
  </div>
</template>
<script setup>
import Plotly from "plotly.js-dist"
import { onActivated, watch, ref } from "vue"

const plot = ref()

const props = defineProps({
  chartVisualization: {
    type: [Object, null],
    required: true,
  },
})

onActivated(() => {
  if (props.chartVisualization && plot.value) {
    // found some issue where the chart size is fixed on 700px width on initial load
    // this .relayout function fix the issue
    Plotly.relayout(plot.value, { autosize: true })
  }
})

watch(
  () => props.chartVisualization,
  (newVal) => {
    if (newVal) {
      Plotly.react(plot.value, newVal.data, newVal.layout, {
        responsive: true,
      })
    } else {
      // remove the chart
      Plotly.purge(plot.value)
    }
  }
)
</script>
<style lang="scss" scoped>
.preview-container {
  background-color: #fff;
  padding: 12px;

  .graph-container {
    min-width: 100%;
    min-height: 500px;
  }
}
</style>
