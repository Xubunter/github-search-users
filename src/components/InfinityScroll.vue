<template>
  <div class="infinity-scroll" ref="container">
    <slot></slot>
    <div class="infinity-scroll__target" ref="container">
      <Observer @intersect="onIntersect"></Observer>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Observer from "./Observer.vue";

export default Vue.extend({
  name: "InfinityScroll",
  components: { Observer },
  data() {
    return {};
  },
  methods: {
    onIntersect() {
      this.$emit("next");
    },
  },
});
</script>

<style lang="scss" scoped>
.infinity-scroll {
  // height: 100%;
  // overflow-y: scroll;
  position: relative;
  &__target {
    position: absolute;
    bottom: 0;
    height: 100vh;
    left: 0;
    right: 0;
    z-index: -100;
  }
}
</style>
