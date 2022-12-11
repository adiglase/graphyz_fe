<template>
  {{ userData }}
</template>

<script setup>
import { AuthService } from "src/services/auth.service"
import { UsersService } from "src/services/users.service"
import { onMounted, ref } from "vue"

const userData = ref({})

onMounted(async () => {
  try {
    const user = await UsersService.getCurrentUser()
    userData.value = user
  } catch (error) {
    console.log(error)
  }
})

const logout = () => {
  AuthService.logOutUser()
}
</script>
