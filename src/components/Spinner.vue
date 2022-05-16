<template>
  <div class="spinner">
    <div class="spinner__el" ref="target" v-show="show"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Spinner",
  components: {},
  props: {
    show: Boolean,
  },
  mounted() {
    const el = this.$refs.target;
    this.$vs.loading({
      target: el,
      type: "scale",
    });
  },
});
</script>

<style lang="scss" scoped>
.spinner {
  position: relative;
  height: 100px;
  z-index: 1;
}
</style>
