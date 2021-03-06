<template>
  <div class="page-user-profile">
    <div v-if="user" class="page-user-profile__info">
      <vs-avatar class="page-user-profile__avatar">
        <img :src="user.avatar_url" alt="" />
      </vs-avatar>
      <h1 class="page-user-profile__login">@{{ user.login }}</h1>
      <h2 class="page-user-profile__name" v-if="user.name">
        {{ user.name }}
      </h2>
    </div>
    <Spinner v-show="loadingUser"></Spinner>
    <infinity-scroll
      v-if="user"
      :page="repositories.length"
      @next="getNextRepositoriesPage"
    >
      <div class="page-user-profile__repositories-header">
        <h2 class="page-user-profile__repositories-title">Repositories:</h2>
        <vs-select
          v-model="repositoriesParams.sort"
          @input="getFirstRepositoriesPage"
        >
          <vs-option
            v-for="(label, key) in sortVariants"
            :key="key"
            :label="label"
            :value="key"
          >
            {{ label }}
          </vs-option>
        </vs-select>
      </div>
      <div class="page-user-profile__repositories">
        <repository-item
          v-for="repo in repositories"
          :key="repo.name"
          :name="repo.name"
          :description="repo.description"
          :html_url="repo.html_url"
        ></repository-item>
        <Spinner :show="loadingRepositories"></Spinner>
      </div>
    </infinity-scroll>
  </div>
</template>

<script lang="ts">
import { User } from "@/types/User";
import Vue from "vue";
import InfinityScroll from "@/components/InfinityScroll.vue";
import RepositoryItem from "@/components/RepositoryItem.vue";
import Spinner from "@/components/Spinner.vue";
import { getUser } from "@/api/getUser";
import { getUserRepositories } from "@/api/getUserRepositories";
import { Repository } from "@/types/Repository";
import {
  ApiNotFoundError,
  ApiUnknownError,
  ApiValidateError,
  assertIsExhausted,
} from "@/types/Errors";
import { notification } from "@/functions/Notification";
import { isEqual } from "@/functions/equal";

type getRepositoriesParams = {
  page: number;
  sort: "full_name" | "created" | "updated" | "pushed";
};

function getInitialParams(): getRepositoriesParams {
  return {
    page: 1,
    sort: "full_name",
  };
}

export default Vue.extend({
  name: "UserProfilePage",
  components: {
    InfinityScroll,
    RepositoryItem,
    Spinner,
  },
  props: {
    username: String,
  },
  data(): {
    user: User | null;
    repositories: Repository[];
    repositoriesParams: getRepositoriesParams;
    loadingUser: boolean;
    loadingRepositories: boolean;
    sortVariants: { [key in getRepositoriesParams["sort"]]: string };
  } {
    return {
      user: null,
      repositories: [],
      repositoriesParams: getInitialParams(),
      loadingUser: false,
      loadingRepositories: false,
      sortVariants: {
        full_name: "Full name",
        created: "Created",
        updated: "Updated",
        pushed: "Pushed",
      },
    };
  },
  mounted() {
    this.getUser();
    this.getFirstRepositoriesPage();
  },
  methods: {
    async getUser() {
      this.loadingUser = true;
      const userEther = await getUser(this.username);
      this.loadingUser = false;

      userEther
        .map((user) => {
          this.user = { ...user };
        })
        .mapLeft((error) => {
          if (error instanceof ApiNotFoundError) {
            notification.error({
              title: "Пользователя не существует",
            });
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
    async getRepositoriesPage(nextPage = 1) {
      const params = { ...this.repositoriesParams };
      const isFirstPage = nextPage === 1;

      this.loadingRepositories = true;
      if (isFirstPage) this.repositories = [];

      const repositoriesEther = await getUserRepositories(this.username, {
        ...params,
        page: nextPage,
      });
      this.loadingRepositories = false;

      const isExpectedRequest = isEqual(params, this.repositoriesParams);
      if (!isExpectedRequest) return;

      repositoriesEther
        .map((repositories) => {
          if (repositories.length === 0) return;

          this.repositoriesParams.page = nextPage;

          this.repositories = isFirstPage
            ? [...repositories]
            : [...this.repositories, ...repositories];
        })
        .mapLeft((error) => {
          if (error instanceof ApiValidateError) {
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
    async getFirstRepositoriesPage() {
      return this.getRepositoriesPage();
    },
    async getNextRepositoriesPage() {
      // Единовременно может быть только один запрос
      if (this.loadingRepositories) return;

      return this.getRepositoriesPage(this.repositoriesParams.page + 1);
    },
  },
});
</script>

<style lang="scss" scoped>
.page-user-profile {
  display: grid;
  padding: 16px 32px;
  grid-template-columns: 400px auto;
  align-items: flex-start;
  grid-gap: 80px;

  &__info {
    text-align: center;
    position: sticky;
    top: 32px;
  }

  &__repositories-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 32px;
  }

  &__repositories-title {
    margin: 0;
  }

  &__avatar {
    width: 400px;
    height: 400px;
  }

  &__repositories {
    display: grid;
    grid-gap: 16px;
  }
}

@media (max-width: 1240px) {
  .page-user-profile {
    grid-template-columns: 260px auto;
    grid-gap: 48px;

    &__login {
      font-size: 1.5em;
    }
    &__avatar {
      width: 260px;
      height: 260px;
    }
  }
}

@media (max-width: 768px) {
  .page-user-profile {
    grid-template-columns: auto;
    grid-gap: 48px;

    &__info {
      position: static;
    }

    &__login {
      font-size: 1.5em;
    }
    &__avatar {
      margin: 0 auto;
    }
  }
}

@media (max-width: 480px) {
  .page-user-profile {
    &__repositories-header {
      display: block;
    }
    &__repositories-title {
      margin-bottom: 1em;
    }
    &__avatar {
      width: 200px;
      height: 200px;
    }
  }
}
</style>
