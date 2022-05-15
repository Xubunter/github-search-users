<template>
  <div class="page-users">
    <div class="page-users__header">
      <vs-input
        v-model="filter.next.searchName"
        @input="onSearch"
        placeholder="User name"
        class="page-users__search"
      >
        <template #icon>
          <box-icon name="search"></box-icon>
        </template>
      </vs-input>
      <div class="page-users__search"></div>
    </div>
    <infinity-scroll @next="nextPage">
      <div class="page-users__list">
        <user-search-item
          class="page-users__user"
          v-for="user in users"
          :key="user.id"
          :avatar="user.avatar_url"
          :login="user.login"
        >
          {{ user.login }}
        </user-search-item>
      </div>
      <div class="page-users__loading" ref="loading" v-show="loading"></div>
    </infinity-scroll>
  </div>
</template>


<script lang="ts">
import Vue from "vue";
import { searchUsers } from "@/api/searchUsers";
import UserSearchItem from "@/components/UserSearchItem.vue";
import InfinityScroll from "@/components/InfinityScroll.vue";
import type { SearchUser } from "@/types/User";
import {
  ApiLimitError,
  ApiUnknownError,
  ApiValidateError,
  assertIsExhausted,
} from "@/types/Errors";
import { notification } from "@/functions/Notification";

type FilterParams = {
  page: number;
  searchName: string;
};

const debounce = (fn: (...args: any) => any, ms = 0) => {
  let timeoutId: any;
  return function (this: any, ...args: any) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

function getInitialFilter(): FilterParams {
  return {
    page: 1,
    searchName: "",
  };
}

export default Vue.extend({
  name: "UsersPage",
  components: {
    UserSearchItem,
    InfinityScroll,
  },
  data(): {
    users: SearchUser[];
    loading: boolean;
    filter: {
      current: FilterParams;
      next: FilterParams;
    };
    retry: {
      attempt: number;
      params: FilterParams;
    };
  } {
    return {
      users: [],
      loading: false,
      filter: {
        current: getInitialFilter(),
        next: getInitialFilter(),
      },
      retry: {
        attempt: 0,
        params: getInitialFilter(),
      },
    };
  },
  computed: {
    filterChanged(): boolean {
      const fCurrent = this.filter.current;
      const fNext = this.filter.next;

      return (
        fCurrent.searchName === fNext.searchName && fCurrent.page === fNext.page
      );
    },
  },
  methods: {
    onSearch: debounce(function (this: any) {
      this.getListUsers();
    }, 300),
    // debounced: debounce(function () {
    //   this.onSearch();
    // }),
    // debounce: debounce,
    async getListUsers() {
      this.filter.next.page = getInitialFilter().page;
      this.loading = true;
      const searchResultEither = await searchUsers({
        page: this.filter.next.page,
        name: this.filter.next.searchName,
      });
      this.loading = false;

      if (searchResultEither.isRight()) {
        const users = searchResultEither.value.items;
        this.users = [...users];
        this.applyCurrentFilter();
        return;
      }
    },
    applyCurrentFilter() {
      this.filter.current = { ...this.filter.next };
    },
    async nextPage() {
      console.log("nextPage", this.filter.next.page);
      if (this.loading) return;

      this.filter.next.page++;
      this.loading = true;
      const searchResultEither = await searchUsers({
        page: this.filter.next.page,
        name: this.filter.next.searchName,
      });
      // const searchResultEither = left(new ApiLimitError(3000));
      // this.loading = false;
      if (searchResultEither.isRight()) {
        this.loading = false;
        const users = searchResultEither.value.items;
        this.users = [...this.users, ...users];
        this.applyCurrentFilter();
        return;
      }

      const error = searchResultEither.value;
      console.log(error);
      if (error instanceof ApiLimitError) {
        this.filter.next.page--;
        this.retryRequest(
          error.wait,
          {
            searchName: this.filter.next.searchName,
            page: this.filter.next.page,
          },
          this.nextPage
        );
      } else if (error instanceof ApiValidateError) {
        notification.error({
          title: "Что-то пошло не так",
        });
      } else if (error instanceof ApiUnknownError) {
        notification.error({
          title: "Что-то пошло совсем не так",
        });
      } else {
        assertIsExhausted(error);
      }
    },
    retryRequest(
      ms: number,
      params: { searchName: string; page: number },
      callback: (...args: any) => any
    ) {
      if (
        params.searchName == this.retry.params.searchName &&
        params.page === this.retry.params.page
      ) {
        this.retry.attempt++;
      } else {
        this.retry.params.searchName = params.searchName;
        this.retry.params.page = params.page;
        this.retry.attempt = 0;
      }

      if (this.retry.attempt > 5) {
        ms = ms * 2;
      }
      if (this.retry.attempt > 6) {
        this.retry.attempt = 0;
        this.loading = false;
        return Promise.resolve();
      }
      return new Promise((resolve) => setTimeout(resolve, ms)).then(() => {
        this.loading = false;
        return callback();
      });
    },
  },
  mounted() {
    this.getListUsers();
    const el = this.$refs.loading as Element;
    this.$vs.loading({
      target: el,
      type: "scale",
    });
  },
});
</script>

<style lang="scss" scoped>
.page-users {
  padding: 16px 32px;
  // height: calc(100vh - 66px);
  &__header {
    margin-bottom: 32px;
    padding: 0 12px;
  }
  &__list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 16px;
  }

  &__loading {
    position: relative;
    height: 200px;
  }
}

@media (max-width: 1440px) {
  .page-users {
    &__list {
      grid-template-columns: 1fr 1fr;
    }
  }
}

@media (max-width: 768px) {
  .page-users {
    &__list {
      grid-template-columns: 1fr;
    }
  }
}

@media (max-width: 460px) {
  .page-users {
    &__list {
      padding: 16px 16px;
    }
  }
}
</style>


