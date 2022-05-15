<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { useAccountStore } from "./store/account";
export default Vue.extend({
  mounted() {
    const account = useAccountStore();
    account.getAccount();
  },
});
</script>

<style lang="scss">
*,
::before,
::after {
  box-sizing: border-box;
}
body {
  margin: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#app {
  color: #2c3e50;
}
</style>
