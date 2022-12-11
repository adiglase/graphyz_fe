<template>
  <q-item
    active-class="active-menu"
    class="menu-item"
    clickable
    v-ripple
    :active="isActive"
    @click="onClick"
  >
    <q-item-section avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>{{ title }}</q-item-section>
  </q-item>
</template>
<script setup>
import { AuthService } from "src/services/auth.service"
import { computed } from "vue"
import { useRoute, useRouter } from "vue-router"

const route = useRoute()
const router = useRouter()

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
})

const isActive = computed(() => {
  return route.name === props.name
})

const onClick = () => {
  if (props.name === "logout") {
    AuthService.logOutUser()
  } else {
    router.push({ name: props.name })
  }
}
</script>
<style scoped lang="scss">
.menu-item {
  border-radius: 6px;
  font-size: 16px;
  color: $second-font-color;
  font-weight: 700;
  margin: 4px 0;
}

.active-menu {
  color: $primary;
  background-color: $faded-primary-color;
}
</style>
