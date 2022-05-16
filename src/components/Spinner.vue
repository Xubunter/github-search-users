<template>
  <div class="spinner"></div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Spinner",
  components: {},
  mounted() {
    this.$vs.loading({
      target: this.$el,
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
