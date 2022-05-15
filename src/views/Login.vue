<template>
  <div class="page-login">
    <vs-button :href="url" flat size="xl" border color="dark">
      <box-icon
        class="page-login__button-icon"
        type="logo"
        name="github"
      ></box-icon>
      Log in with GitHub
    </vs-button>
  </div>
</template>

<script lang="ts">
import { getOAuthLoginLink } from "@/api/OAuthLogin";
import Vue from "vue";

export default Vue.extend({
  name: "LoginPage",
  components: {},
  data() {
    return {
      url: getOAuthLoginLink(),
    };
  },
});
</script>

<style lang="scss" scoped>
.page-login {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &__button-icon {
    margin-right: 0.5em;
  }
}
</style>
