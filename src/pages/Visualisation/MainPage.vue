<template>
  <div class="container">
    <div class="page-navigation">
      <q-tabs v-model="tab" active-color="primary" indicator-color="primary">
        <q-tab name="configuration" label="Configuration" />
        <q-tab name="preview" label="Preview" />
      </q-tabs>
    </div>

    <div class="q-mt-md">
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="configuration">
          <ChartData></ChartData>
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
import ChartData from "./ChartConfiguration.vue"
import ChartPreview from "./ChartPreview.vue"

const tab = ref("configuration")
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
