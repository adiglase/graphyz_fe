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
      required
    >
      <template v-slot:prepend>
        <q-icon name="badge" />
      </template>
    </q-input>

    <q-input
      v-model="formInput.email"
      stack-label
      outlined
      type="email"
      label="Email"
      required
    >
      <template v-slot:prepend>
        <q-icon name="mail" />
      </template>
    </q-input>

    <q-input
      v-model="formInput.password"
      stack-label
      outlined
      type="password"
      label="Password"
      required
    >
      <template v-slot:prepend>
        <q-icon name="key" />
      </template>
    </q-input>

    <q-input
      v-model="formInput.password2"
      stack-label
      outlined
      type="password"
      label="Confirm your password"
      required
    >
      <template v-slot:prepend>
        <q-icon name="key" />
      </template>
    </q-input>

    <router-link class="block q-mt-sm text-right" :to="{ name: 'login' }"
      >Forgot Password?</router-link
    >
    <div>
      <q-btn class="full-width" label="SIGN UP" type="submit" color="primary" />
    </div>
  </q-form>

  <div class="block text-center q-ma-lg">
    Already have an account?
    <router-link :to="{ name: 'login' }">Sign in instead</router-link>
  </div>
</template>
<script setup>
import TheLogo from "../../components/TheLogo.vue";
import { ref } from "vue";

const formInput = ref({
  username: "",
  email: "",
  password: "",
  password2: "",
});

const onSubmit = () => {
  console.log(formInput.value);
};
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
