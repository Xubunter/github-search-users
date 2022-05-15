import { setActivePinia, createPinia } from "pinia";
import { useAccountStore } from "@/store/account";
import { left, right } from "@sweet-monads/either";
import { User } from "@/types/User";
import { ApiAuthenticationError, ApiForbiddenError, ApiUnknownError } from "@/types/Errors";
import * as OAuthLogin from "@/api/OAuthLogin";
import * as accessToken from "@/api/accessToken";
import * as getAccount from "@/api/getAccount";
import router from "@/router";

const mockedNotification = jest.fn();

jest.mock("@/functions/Notification", () => ({
  notification: {
    error: jest.fn().mockImplementation(() => mockedNotification()),
  },
}));

jest.mock("@/api/getAccount");
const mockedFetchAccount = getAccount as jest.Mocked<typeof getAccount>;

jest.mock("@/api/accessToken");
const mockedIsAuthenticated = accessToken as jest.Mocked<typeof accessToken>;

jest.mock("@/api/OAuthLogin");
const mockedOAuthLogin = OAuthLogin as jest.Mocked<typeof OAuthLogin>;

jest.mock("@/router");
const mockedRouter = router as jest.Mocked<typeof router>;

const USER: User = {
  avatar_url: "avatar_url",
  bio: "bio",
  blog: "blog",
  company: "company",
  email: "email",
  followers: 0,
  following: 0,
  html_url: "html_url",
  id: 0,
  login: "login",
  name: null,
  public_gists: 0,
  public_repos: 0,
  repos_url: "",
  twitter_username: null,
};

beforeEach(() => {
  setActivePinia(createPinia());
  jest.clearAllMocks();
});

describe("accountStore", () => {
  describe("getAccount action", () => {
    it("saves user to state if request is success", async () => {
      mockedFetchAccount.fetchAccount.mockResolvedValue(right({ ...USER }));
      mockedIsAuthenticated.isAuthenticated.mockReturnValue(true);
      const accountStore = useAccountStore();

      await accountStore.getAccount();

      expect(accountStore.user).toEqual(USER);
    });

    it("notify if request fails", async () => {
      mockedFetchAccount.fetchAccount.mockResolvedValueOnce(left(new ApiAuthenticationError()));
      mockedFetchAccount.fetchAccount.mockResolvedValueOnce(left(new ApiForbiddenError()));
      mockedFetchAccount.fetchAccount.mockResolvedValueOnce(left(new ApiUnknownError()));
      mockedIsAuthenticated.isAuthenticated.mockReturnValue(true);
      const accountStore = useAccountStore();
      const initialUserState = { ...accountStore.user };

      await accountStore.getAccount();
      await accountStore.getAccount();
      await accountStore.getAccount();

      expect(accountStore.user).toEqual(initialUserState);
      expect(mockedNotification).toBeCalledTimes(3);
    });

    it("does nothing if not authenticated", async () => {
      mockedIsAuthenticated.isAuthenticated.mockReturnValue(false);
      const accountStore = useAccountStore();
      const initialUserState = { ...accountStore.user };

      await accountStore.getAccount();

      expect(accountStore.user).toEqual(initialUserState);
      expect(mockedNotification).not.toBeCalled();
    });
  });

  describe("login action", () => {
    beforeEach(() => {
      mockedIsAuthenticated.isAuthenticated.mockReturnValue(true);
    });

    it("calls getAccount if request is success", async () => {
      mockedOAuthLogin.OAuthLogin.mockResolvedValue(right(true));
      mockedFetchAccount.fetchAccount.mockResolvedValue(right({ ...USER }));
      const accountStore = useAccountStore();

      await accountStore.login("access_code");

      expect(accountStore.user).toEqual(USER);
      expect(mockedNotification).not.toBeCalled();
    });

    it("notify if request is fail", async () => {
      mockedOAuthLogin.OAuthLogin.mockResolvedValueOnce(left(new ApiUnknownError()));
      mockedOAuthLogin.OAuthLogin.mockResolvedValueOnce(left(new OAuthLogin.OAuthLoginTokenError()));

      const accountStore = useAccountStore();

      await accountStore.login("access_code");
      await accountStore.login("access_code");

      expect(mockedNotification).toBeCalledTimes(2);
    });
  });

  describe("logout action", () => {
    beforeEach(() => {
      mockedIsAuthenticated.isAuthenticated.mockReturnValue(true);
    });

    it("calls getAccount if request is success", async () => {
      mockedOAuthLogin.OAuthLogin.mockResolvedValue(right(true));
      mockedFetchAccount.fetchAccount.mockResolvedValue(right({ ...USER }));
      const accountStore = useAccountStore();

      await accountStore.login("access_code");

      expect(accountStore.user).toEqual(USER);
      expect(mockedNotification).not.toBeCalled();
    });

    it("notify if request is fail", async () => {
      mockedOAuthLogin.OAuthLogin.mockResolvedValueOnce(left(new ApiUnknownError()));
      mockedOAuthLogin.OAuthLogin.mockResolvedValueOnce(left(new OAuthLogin.OAuthLoginTokenError()));
      const accountStore = useAccountStore();

      await accountStore.login("access_code");
      await accountStore.login("access_code");

      expect(mockedNotification).toBeCalledTimes(2);
    });
  });

  describe("logout action", () => {
    it("calls dropToken, clears user state and redirect to login page", async () => {
      mockedIsAuthenticated.isAuthenticated.mockReturnValue(true);
      mockedOAuthLogin.OAuthLogin.mockResolvedValue(right(true));
      mockedFetchAccount.fetchAccount.mockResolvedValue(right({ ...USER }));
      const accountStore = useAccountStore();
      const initialUserState = { ...accountStore.user };

      await accountStore.login("access_code");
      expect(accountStore.user).toEqual(USER);
      accountStore.logout();

      expect(accountStore.user).toEqual(initialUserState);
      expect(mockedOAuthLogin.OAuthLogout).toBeCalled();
      expect(mockedRouter.push).toBeCalledWith({ name: "login" });
    });
  });
});
