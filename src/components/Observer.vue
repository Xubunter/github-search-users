<template>
  <div class="observer"></div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Observer",
  components: {},
  data(): { observer: IntersectionObserver | null } {
    return {
      observer: null,
    };
  },
  mounted() {
    const options = {};
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting) {
        console.log("intersect");
        this.$emit("intersect");
      }
    }, options);

    this.observer.observe(this.$el);
  },
});
</script>
