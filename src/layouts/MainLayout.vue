<template>
  <q-layout view="lHh Lpr lFf">
    <q-drawer
      class="drawer q-pa-md"
      v-model="leftDrawerOpen"
      show-if-above
      elevated
    >
      <div class="q-mx-sm q-mb-md">
        <TheLogo></TheLogo>
      </div>

      <q-list>
        <NavMenuItem
          v-for="menu in navMenus"
          :key="menu.name"
          :title="menu.title"
          :name="menu.name"
          :icon="menu.icon"
        ></NavMenuItem>
      </q-list>
    </q-drawer>

    <q-page-container>
      <HeaderBar @toggle-left-drawer="toggleLeftDrawer"></HeaderBar>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue"
import TheLogo from "src/components/TheLogo.vue"
import NavMenuItem from "src/components/NavMenuItem.vue"
import HeaderBar from "src/components/HeaderBar.vue"

export default defineComponent({
  name: "MainLayout",

  components: { TheLogo, NavMenuItem, HeaderBar },

  setup() {
    const leftDrawerOpen = ref(false)
    const navMenus = [
      {
        title: "Home",
        name: "home",
        icon: "house",
      },
      {
        title: "My Charts",
        name: "my-charts",
        icon: "insights",
      },
      {
        title: "Logout",
        name: "logout",
        icon: "o_logout",
      },
    ]

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      navMenus,
    }
  },
})
</script>
<style lang="scss" scoped>
.q-layout {
  background-color: $primary-background-color;
  padding: 20px;
}
</style>
