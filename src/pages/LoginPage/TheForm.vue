<template>
  <TheLogo></TheLogo>
  <h2>Welcome To Graphyz!</h2>
  <h3>Please sign-in to your account and start visualizing your data!</h3>

  <q-form @submit.prevent.stop="onSubmit" class="q-gutter-md q-mb-md">
    <q-input
      v-model="formInput.username"
      stack-label
      outlined
      type="text"
      label="Username"
      required
      :error-message="
        serializedErrors[0].username
          ? serializedErrors[0].username.join(' .')
          : ''
      "
      :error="serializedErrors[0].username ? true : false"
    >
      <template #prepend>
        <q-icon name="badge" />
      </template>
    </q-input>

    <q-input
      v-model="formInput.password"
      stack-label
      outlined
      type="password"
      label="Password"
      required
      :error-message="
        serializedErrors[0].password
          ? serializedErrors[0].password.join(' .')
          : ''
      "
      :error="serializedErrors[0].password ? true : false"
    >
      <template #prepend>
        <q-icon name="key" />
      </template>
    </q-input>

    <div>
      <q-btn
        :loading="isLoading"
        class="full-width"
        label="SIGN IN"
        type="submit"
        color="primary"
      />
    </div>

    <router-link class="block q-mt-sm text-right" :to="{ name: 'login' }"
      >Forgot password?</router-link
    >
  </q-form>

  <TheAlert
    type="danger"
    :message="serializedErrors[1].join(', ')"
    v-if="serializedErrors[1]"
  />

  <TheAlert
    type="danger"
    :message="serializedErrors[2]"
    v-if="serializedErrors[2]"
  />

  <div class="block text-center q-ma-lg">
    New to our platform?
    <router-link :to="{ name: 'sign-up' }">Create an account</router-link>
  </div>
</template>
<script setup>
import TheLogo from "../../components/TheLogo.vue"
import TheAlert from "src/components/TheAlert.vue"
import { computed, ref } from "vue"
import { AuthService } from "src/services/auth.service"
import { serializeBEError } from "src/services/utils"

const formInput = ref({
  username: "",
  password: "",
})
const isLoading = ref(false)
const errors = ref({})

const serializedErrors = computed(() => {
  return serializeBEError(errors.value)
})

const onSubmit = async () => {
  errors.value = {}
  isLoading.value = true
  try {
    await AuthService.makeLogin({
      username: formInput.value.username,
      password: formInput.value.password,
    })
  } catch (error) {
    errors.value = error.message
  }
  isLoading.value = false
}
</script>
<style lang="scss" scoped>
h2,
h3 {
  line-height: 1.5;
}
h2 {
  margin: 32px 0 0 0;
  font-size: 20px;
  font-weight: 500;
}
h3 {
  font-size: 16px;
  color: $second-font-color;
}
</style>
