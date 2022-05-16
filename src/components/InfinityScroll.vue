<template>
  <div class="infinity-scroll" ref="container">
    <slot></slot>
    <div class="infinity-scroll__target" ref="container">
      <Observer
        :key="page"
        @intersect="onIntersect"
        style="height: 100%"
      ></Observer>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Observer from "./Observer.vue";

export default Vue.extend({
  name: "InfinityScroll",
  components: { Observer },
  props: {
    page: {
      type: Number,
      default: -1,
    },
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
    // max-height: 1000px;
    left: 0;
    right: 0;
    z-index: -100;
  }
}
</style>
