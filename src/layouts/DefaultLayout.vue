<template>
  <div class="layout-default">
    <TheHeader class="layout-default__header"></TheHeader>
    <main class="layout-default__body">
      <router-view></router-view>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TheHeader from "./components/TheHeader.vue";

export default Vue.extend({
  name: "DefaultLayout",
  components: { TheHeader },
  data() {
    return {};
  },
  methods: {},
});
</script>

<style lang="scss" scoped>
.layout-default {
  &__body {
    padding-top: 20px;
  }
}
</style>
