<template>
  <header class="header">
    <div class="header__profile">
      <vs-avatar class="header__profile-avatar">
        <img v-if="user.avatar_url" :src="user.avatar_url" alt="" />
        <template v-else #text> {{ user.login }} </template>
      </vs-avatar>
      <vs-button size="large" icon danger title="Logout" @click="logout">
        <box-icon name="exit" color="white"></box-icon>
      </vs-button>
    </div>
  </header>
</template>

<script lang="ts">
import { useAccountStore } from "@/store/account";
import Vue from "vue";
import { mapState, mapActions } from "pinia";

export default Vue.extend({
  name: "Header",
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState(useAccountStore, ["user"]),
  },
  methods: {
    ...mapActions(useAccountStore, ["logout"]),
  },
});
</script>

<style lang="scss" scoped>
.header {
  background: #fff;
  box-shadow: 0 2px 8px #f0f1f2;
  position: relative;
  z-index: 10;
  max-width: 100%;
  width: 100%;
  padding: 8px 32px;

  display: flex;
  justify-content: flex-end;

  &__profile {
    display: flex;
    align-items: center;
  }
}
</style>
