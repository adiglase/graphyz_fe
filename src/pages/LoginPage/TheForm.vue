<template>
  <TheLogo></TheLogo>
  <h2>Welcome To Graphyz!</h2>
  <h3>Please sign-in to your account and start visualizing your data!</h3>

  <q-form @submit.prevent.stop="onSubmit" class="q-gutter-md">
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
    >
      <template v-slot:prepend>
        <q-icon name="key" />
      </template>
    </q-input>
    <router-link class="block q-mt-sm text-right" :to="{ name: 'login' }"
      >Forgot Password?</router-link
    >
    <div>
      <q-btn class="full-width" label="SIGN IN" type="submit" color="primary" />
    </div>
  </q-form>

  <div class="block text-center q-ma-lg">
    New to our platform?
    <router-link :to="{ name: 'sign-up' }">Create an account</router-link>
  </div>
</template>
<script setup>
import TheLogo from "../../components/TheLogo.vue";
import { ref } from "vue";

const formInput = ref({
  email: "",
  password: "",
});

const onSubmit = () => {
  console.log(formInput);
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
