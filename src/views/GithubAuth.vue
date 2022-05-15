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
    return {
      code: this.$route.query.code,
    };
  },
  async created() {
    const access_code = this.$route.query.code;
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
