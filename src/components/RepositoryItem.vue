<template>
  <div class="repository-item">
    <h3 class="repository-item__name">{{ name }}</h3>
    <p class="repository-item__description">{{ description }}</p>
    <div class="repository-item__link">
      <a :href="html_url" target="__blank">
        <vs-button icon shadow class="repository-item__link">
          <box-icon name="link-external"></box-icon>
        </vs-button>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "RepositoryItem",
  components: {},
  props: {
    name: String,
    html_url: String,
    description: String,
  },
  data() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.repository-item {
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.05);
  padding: 8px 16px;

  display: grid;
  grid-template-columns: auto 64px;
  grid-gap: 16px;
  grid-template-areas:
    "name link"
    "desc link";

  &__name {
    grid-area: name;
    margin: 0;
  }
  &__description {
    grid-area: desc;
    margin: 0;
  }

  &__link {
    align-self: center;
    justify-self: center;
    grid-area: link;
  }
}

@media (max-width: 540px) {
  .repository-item {
    grid-template-columns: auto 48px;
    grid-template-areas:
      "name name"
      "desc link";

    &__name {
      font-size: 1em;
    }
    &__description {
      font-size: 0.8em;
    }
  }
}
@media (max-width: 360px) {
  .repository-item {
    grid-template-columns: auto 32px;
    grid-template-areas:
      "name name"
      "desc link";
    grid-gap: 12px 8px;

    &__name {
      font-size: 0.8em;
    }
  }
}
</style>
