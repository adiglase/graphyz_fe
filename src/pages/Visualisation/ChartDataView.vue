<template>
  <hot-table ref="handsOnTableRef" :settings="hotSettings"></hot-table>
</template>
<script setup>
import { ref, watch } from "vue"
import { HotTable } from "@handsontable/vue3"
import { registerAllModules } from "handsontable/registry"
import "handsontable/dist/handsontable.full.css"

registerAllModules()

const handsOnTableRef = ref(null)

const props = defineProps({
  isLoading: {
    type: Boolean,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
})
const hotSettings = ref({
  data: props.data,
  colHeaders: true,
  height: "auto",
  renderAllRows: false,
  height: "500px",
  readOnly: true,
  rowHeaders: true,
  licenseKey: "non-commercial-and-evaluation",
})

watch(
  () => props.data,
  (newVal) => {
    if (handsOnTableRef.value) {
      handsOnTableRef.value.hotInstance.loadData(newVal)
    }
  }
)
</script>
