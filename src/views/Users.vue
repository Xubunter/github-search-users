<template>
  <div class="page-users">
    <div class="page-users__header">
      <vs-input
        v-model="params.name"
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
    <infinity-scroll @next="getNextPage" :page="users.length">
      <div class="page-users__list">
        <h3
          class="page-users__list-empry-message"
          v-if="!loading && users.length === 0"
        >
          Ничего не найдено
        </h3>
        <router-link
          class="page-users__user-link"
          :to="{
            name: 'user-profile',
            params: { username: user.login },
          }"
          v-for="user in users"
          :key="user.id"
        >
          <user-search-item
            class="page-users__user"
            :avatar="user.avatar_url"
            :login="user.login"
          ></user-search-item>
        </router-link>
      </div>
      <Spinner :show="loading"></Spinner>
    </infinity-scroll>
  </div>
</template>


<script lang="ts">
import Vue from "vue";
import { searchUsers } from "@/api/searchUsers";
import UserSearchItem from "@/components/UserSearchItem.vue";
import InfinityScroll from "@/components/InfinityScroll.vue";
import Spinner from "@/components/Spinner.vue";
import type { SearchUser } from "@/types/User";
import {
  ApiLimitError,
  ApiUnknownError,
  ApiValidateError,
  assertIsExhausted,
} from "@/types/Errors";
import { notification } from "@/functions/Notification";
import { isEqual } from "@/functions/equal";
import { debounce } from "@/functions/debounce";

type SearchParams = {
  page: number;
  name: string;
};

function getInitialParams(): SearchParams {
  return {
    page: 1,
    name: "",
  };
}

export default Vue.extend({
  name: "UsersPage",
  components: {
    UserSearchItem,
    InfinityScroll,
    Spinner,
  },
  data(): {
    users: SearchUser[];
    loading: boolean;
    params: SearchParams;
    totalUsers: number;
    retry: {
      attempt: number;
      params: SearchParams;
    };
  } {
    return {
      users: [],
      loading: false,
      totalUsers: 0,
      params: getInitialParams(),
      retry: {
        attempt: 0,
        params: getInitialParams(),
      },
    };
  },
  computed: {
    hasNextPage(): boolean {
      return Boolean(this.totalUsers > this.users.length);
    },
  },
  methods: {
    onSearch: debounce(function (this: any) {
      this.getFirstPage();
    }, 300),

    // Github иногда возвращает повторяющихся юзеров. Избавляемся от них
    filterNonUniqueUsers(users: SearchUser[]) {
      let ids = this.users.map((u) => u.id);

      return users.reduce((acc: SearchUser[], u) => {
        if (ids.includes(u.id)) return acc;
        acc.push(u);
        return acc;
      }, []);
    },

    async getUsers(nextPage = 1) {
      const params = { ...this.params };
      const isFirstPage = nextPage === 1;

      this.loading = true;
      if (isFirstPage) this.users = [];

      const searchResultEither = await searchUsers({
        ...params,
        page: nextPage,
      });
      this.loading = false;

      const isExpectedRequest = isEqual(params, this.params);
      if (!isExpectedRequest) return;

      searchResultEither
        .map((data) => {
          const users = data.items;
          this.totalUsers = data.total_count;

          if (users.length === 0) return;

          this.params.page = nextPage;
          this.users = isFirstPage
            ? [...users]
            : [...this.users, ...this.filterNonUniqueUsers(users)];
        })
        .mapLeft((error) => {
          if (error instanceof ApiLimitError) {
            this.loading = true;
            this.retryRequest(
              error.wait,
              params,
              () => this.getUsers(nextPage),
              (attempt) => {
                if (attempt === null) {
                  notification.error({
                    title:
                      "Не удалось получить ответ от сервера, попробуйте позже",
                  });
                  return;
                } else {
                  notification.error({
                    title: "Превышен лимит запросов",
                    text: `${attempt}-я попытка повторить запрос`,
                  });
                }
              }
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
        });
    },

    async getFirstPage() {
      return this.getUsers();
    },
    async getNextPage() {
      // Единовременно может быть только один запрос
      if (this.loading) return;
      // Страниц больше нет
      if (!this.hasNextPage) return;

      return this.getUsers(this.params.page + 1);
    },
    retryRequest(
      ms: number,
      params: SearchParams,
      request: (...args: any) => any,
      onFail?: (attempt: number | null) => void
    ) {
      const RETRY_LIMIT = 5;

      params = { ...params };

      if (this.retry.attempt >= RETRY_LIMIT) {
        this.retry.attempt = 0;
        onFail && onFail(null);
        this.loading = false;
        return Promise.resolve();
      }

      const isNewRetryRequest = !isEqual(params, this.retry.params);
      if (isNewRetryRequest) {
        this.retry.params = { ...params };
        this.retry.attempt = 0;
      }

      this.retry.attempt++;

      onFail && onFail(this.retry.attempt);

      return new Promise((resolve) => setTimeout(resolve, ms)).then(() => {
        const isExpectedRequest = isEqual(params, this.params);
        if (!isExpectedRequest) return;

        this.loading = false;
        request();
      });
    },
  },
  mounted() {
    this.getFirstPage();
  },
});
</script>

<style lang="scss" scoped>
.page-users {
  padding: 16px 32px;
  &__header {
    margin-bottom: 32px;
    padding: 0 12px;
  }
  &__list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 16px;
  }
  &__user-link {
    text-decoration: none;
    color: #2c3e50;
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


