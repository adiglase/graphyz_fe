<template>
  <q-layout>
    <q-page-container>
      <div class="container row">
        <div
          class="welcome-illustration gt-sm col-7 row window-height justify-center items-center"
        >
          <div class="full-width illustration-container">
            <router-view name="illustration"></router-view>
          </div>
        </div>

        <div class="col form-container row flex-center">
          <div class="column full-width">
            <router-view name="form"></router-view>
          </div>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>
<style lang="scss" scoped>
.welcome-illustration {
  padding: 30px;
  background-color: #f5f5f9;

  .illustration-container {
    .q-img {
      max-height: 90vh !important;
    }
  }
}
.form-container {
  padding: 40px;
}
</style>
