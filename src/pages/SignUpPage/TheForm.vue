<template>
  <TheLogo></TheLogo>
  <h2>Your adventure with data start here!</h2>
  <h3>Make your data visualization process seamlessly easy</h3>

  <q-form @submit.prevent.stop="onSubmit" class="q-gutter-md">
    <q-input
      v-model="formInput.username"
      stack-label
      outlined
      type="text"
      label="Username"
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
      v-model="formInput.email"
      stack-label
      outlined
      type="email"
      label="Email"
      :error-message="
        serializedErrors[0].email ? serializedErrors[0].email.join(' .') : ''
      "
      :error="serializedErrors[0].email ? true : false"
    >
      <template #prepend>
        <q-icon name="mail" />
      </template>
    </q-input>

    <q-input
      v-model="formInput.password"
      stack-label
      outlined
      type="password"
      label="Password"
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

    <q-input
      v-model="formInput.password2"
      stack-label
      outlined
      type="password"
      label="Confirm your password"
      :error-message="
        serializedErrors[0].password2
          ? serializedErrors[0].password2.join(' .')
          : ''
      "
      :error="serializedErrors[0].password2 ? true : false"
    >
      <template #prepend>
        <q-icon name="key" />
      </template>
    </q-input>

    <div>
      <q-btn
        :loading="isLoading"
        class="full-width"
        label="SIGN UP"
        type="submit"
        color="primary"
      />
    </div>
  </q-form>

  <div class="block text-center q-ma-lg">
    Already have an account?
    <router-link :to="{ name: 'login' }">Sign in instead</router-link>
  </div>

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
</template>
<script setup>
import TheLogo from "../../components/TheLogo.vue"
import TheAlert from "src/components/TheAlert.vue"
import { computed, ref } from "vue"
import { serializeBEError } from "src/services/utils"
import { AuthService } from "src/services/auth.service"
import { useRouter } from "vue-router"
import { Notify } from "quasar"

const router = useRouter()

const formInput = ref({
  username: "",
  email: "",
  password: "",
  password2: "",
})

const isLoading = ref(false)
const errors = ref({})

const onSubmit = async () => {
  isLoading.value = true

  try {
    await AuthService.registerUser({
      username: formInput.value.username,
      email: formInput.value.email,
      password: formInput.value.password,
      password2: formInput.value.password2,
    })

    router.push({ name: "login" })
    Notify.create({
      type: "info",
      message: "Register is success, please sign in",
    })
  } catch (error) {
    errors.value = error.message
  }

  isLoading.value = false
}

const serializedErrors = computed(() => {
  return serializeBEError(errors.value)
})
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
