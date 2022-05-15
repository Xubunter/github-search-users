import {
  OAuthLogin,
  OAuthLogout,
  getOAuthLoginLink,
  OAuthLoginTokenError,
} from "@/api/OAuthLogin";
import { rest } from "@/api/rest";
import { setToken, dropToken } from "@/api/accessToken";
import { ApiUnknownError } from "@/types/Errors";

jest.mock("@/api/rest");
const mockedRest = rest as jest.Mocked<typeof rest>;

jest.mock("@/api/accessToken");
const mockedSetToken = setToken as jest.Mocked<typeof setToken>;
const mockedDropToken = dropToken as jest.Mocked<typeof dropToken>;

describe("Github login", () => {
  const INITIAL_ENV = process.env;

  beforeEach(() => {
    process.env = { ...INITIAL_ENV };
    jest.clearAllMocks();
  });

  describe("OAuth login url", () => {
    it("get github OAuth login url", () => {
      const CLIENT_ID = "client_id";
      process.env.VUE_APP_CLIENT_ID = CLIENT_ID;

      const EXPECTED_URL =
        "https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID;

      expect(getOAuthLoginLink()).toBe(EXPECTED_URL);
    });
  });

  describe("OAuthLogin", () => {
    it("executes POST reqest with required parameters", async () => {
      const access_code = "valid_code";
      const response = { data: { access_token: "valid_token" } };
      const CLIENT_ID = "client_id";
      const CLIENT_SECRET = "client_secret";
      process.env.VUE_APP_CLIENT_ID = CLIENT_ID;
      process.env.VUE_APP_CLIENT_SECRET = CLIENT_SECRET;
      mockedRest.post.mockResolvedValue(response);

      await OAuthLogin(access_code);

      expect(rest.post).toHaveBeenCalledWith(
        "/login/oauth/access_token",
        {
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          code: access_code,
        },
        {
          baseURL: "https://github.com/",
        }
      );
    });

    it("gets and saves access token successful", async () => {
      mockedRest.post.mockClear();
      const access_code = "valid_code";
      const response = { data: { access_token: "valid_token" } };
      mockedRest.post.mockResolvedValue(response);

      const result = await OAuthLogin(access_code);

      expect(mockedSetToken).toHaveBeenCalledWith(response.data.access_token);
      expect(result.isRight).toBeTruthy();
      expect(result.value).toBe(true);
    });

    it("returns TokenError if doesn't get access token", async () => {
      const access_code = "valid_code";
      const response = { data: {} };
      mockedRest.post.mockResolvedValue(response);

      const result = await OAuthLogin(access_code);

      expect(result.isLeft).toBeTruthy();
      expect(result.value).toBeInstanceOf(OAuthLoginTokenError);
    });

    it("returns ApiUnknownError if the API call fails", async () => {
      const access_code = "valid_code";
      mockedRest.post.mockRejectedValue("new Error()");

      const result = await OAuthLogin(access_code);

      expect(result.isLeft).toBeTruthy();
      expect(result.value).toBeInstanceOf(ApiUnknownError);
    });
  });

  describe("OAuthLogin", () => {
    it("OAuthLogout calls dropToken", async () => {
      OAuthLogout();

      expect(mockedDropToken).toHaveBeenCalled();
    });
  });
});
