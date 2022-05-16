<template>
  <div></div>
</template>

<script lang="ts">
import Vue from "vue";
import { useAccountStore } from "@/store/account";

export default Vue.extend({
  name: "LoginPage",
  components: {},
  data() {
    return {};
  },
  async created() {
    const searchParams = new URLSearchParams(location.search);
    const access_code = searchParams.get("code");

    if (typeof access_code === "string") {
      const account = useAccountStore();
      await account.login(access_code);
      this.$router.push({ name: "users" });
    } else {
      this.$router.push({ name: "login" });
    }
  },
});
</script>
