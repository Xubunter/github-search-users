import { isAuthenticated } from "@/api/accessToken";
import {
  ApiAuthenticationError,
  ApiForbiddenError,
  assertIsExhausted,
  ApiUnknownError,
  ApiValidateError,
} from "@/types/Errors";
import { fetchAccount } from "@/api/getAccount";
import { OAuthLogout, OAuthLogin, OAuthLoginTokenError } from "@/api/OAuthLogin";
import { User } from "@/types/User";
import router from "@/router";
import { notification } from "@/functions/Notification";
import { defineStore } from "pinia";

const INITIAL_ACCOUNT_STATE: User = {
  id: 0,
  avatar_url: null,
  bio: null,
  blog: null,
  company: null,
  email: null,
  followers: 0,
  following: 0,
  html_url: "",
  login: "",
  name: null,
  public_gists: 0,
  public_repos: 0,
  repos_url: "",
  twitter_username: null,
};

export const useAccountStore = defineStore("accountStore", {
  state: (): { user: User } => ({
    user: { ...INITIAL_ACCOUNT_STATE },
  }),
  actions: {
    clearState() {
      this.user = { ...INITIAL_ACCOUNT_STATE };
    },
    async getAccount() {
      if (isAuthenticated()) {
        const userEither = await fetchAccount();
        if (userEither.isRight()) {
          this.user = { ...userEither.value };
          return;
        }

        const error = userEither.value;
        if (error instanceof ApiForbiddenError) {
          notification.error({
            title: "Не удалось получить профиль",
            text: "Нет прав",
          });
        } else if (error instanceof ApiAuthenticationError) {
          notification.error({
            title: "Доступно только авторизованным пользователям",
            text: "Для получения доступа войдите в свой аккаунт",
          });
        } else if (error instanceof ApiUnknownError || error instanceof ApiValidateError) {
          notification.error({
            title: "Ой, что-то сломалось",
            text: error.details.message,
          });
        } else {
          assertIsExhausted(error);
        }
      }
    },
    async login(access_code: string) {
      try {
        const loginResponseEither = await OAuthLogin(access_code);
        if (loginResponseEither.isRight()) {
          await this.getAccount();
          return;
        }

        const error = loginResponseEither.value;
        if (error instanceof OAuthLoginTokenError) {
          notification.error({
            title: "Ой, что-то сломалось",
            text: "Код аунтификации не действителен",
          });
        } else if (error instanceof ApiUnknownError) {
          notification.error({
            title: "Ой, что-то сломалось",
            text: error.details.message,
          });
        } else {
          assertIsExhausted(error);
        }
      } catch (e) {
        console.error(e);
        notification.error({
          title: "Ой, что-то сломалось",
        });
      }
    },
    logout() {
      OAuthLogout();
      this.clearState();
      router.push({ name: "login" });
    },
  },
});
