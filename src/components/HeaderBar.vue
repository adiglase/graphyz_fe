<template>
  <div class="container q-pa-sm q-mb-md">
    <div class="sidebar-toggle-btn">
      <q-btn @click="$emit('toggleLeftDrawer')" unelevated icon="menu" />
    </div>
    <span class="avatar">
      <q-btn-dropdown unelevated fab-mini>
        <template #label>
          <div class="row items-center no-wrap">
            <q-img src="~assets/dummy-avatar.svg" />
          </div>
        </template>

        <q-list>
          <q-item>
            <q-item-section>
              <q-item-label
                >Hello,
                <span class="text-bold">{{
                  userStore.getUserData()?.username
                }}</span></q-item-label
              >
            </q-item-section>
          </q-item>

          <q-separator />

          <q-item clickable v-close-popup @click="logoutUser">
            <q-item-section>
              <q-item-label>Logout</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </span>
  </div>
</template>
<script setup>
import { defineEmits } from "vue"
import { useUserStore } from "src/stores/user-store"
import { AuthService } from "src/services/auth.service"

const userStore = useUserStore()

defineEmits(["toggleLeftDrawer"])

const logoutUser = () => {
  AuthService.logOutUser()
}
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border-radius: $card-border-radius;
}
.avatar {
  display: block;

  .q-img {
    width: 34px;
  }
}
</style>
