<template>
  <!-- <vs-card type="4" class="user-search-item">
    <template #title>
      <h3 class="user-search-item__avatar">{{ login }}</h3>
    </template>
    <template #img>
      <img :src="avatar" alt="" />
    </template>
    <template #text>
      <p>Lorem</p>
    </template>
  </vs-card> -->
  <div class="user-search-item">
    <vs-avatar class="user-search-item__avatar">
      <img :src="avatar" alt="" />
    </vs-avatar>
    <div class="user-search-item__login">{{ login }}</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "UserSearchItem",
  components: {},
  props: {
    avatar: String,
    login: String,
  },
  data() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.user-search-item {
  display: grid;
  grid-template-columns: 96px auto;
  grid-gap: 32px;
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.05);
  &__avatar {
    width: 96px;
    height: 96px;
  }
  &__login {
    font-size: 20px;
    align-self: center;
  }
}

@media (max-width: 460px) {
  .user-search-item {
    display: grid;
    grid-template-columns: 64px auto;
    grid-gap: 16px;
    &__avatar {
      width: 64px;
      height: 64px;
    }
    &__login {
      font-size: 18px;
      align-self: center;
    }
  }
}
</style>
