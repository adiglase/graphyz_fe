<template>
  <div class="preview-container">
    <div v-if="!chartVisualization">No chart/not configured</div>
    <div ref="plot" class="graph-container"></div>
  </div>
</template>
<script setup>
import Plotly from "plotly.js-dist"
import { onActivated, watch, ref, onMounted } from "vue"

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

onMounted(() => {
  watch(
  () => props.chartVisualization,
  (newVal) => {
    if (newVal) {
      // watch has to wait for mounted because the dom only appear after it's already mounted
      Plotly.react(plot.value, newVal.data, newVal.layout, {
        responsive: true,
      })
    } else if (plot.value.classList.contains('js-plotly-plot')) {
      // if chart already initialized to the dom before
      // remove the chart
      Plotly.purge(plot.value)
    }
  }, {
    immediate: true
  }
)
})

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
