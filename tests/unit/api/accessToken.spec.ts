import Cookies from "js-cookie";
import {
  setToken,
  getToken,
  dropToken,
  isAuthenticated,
} from "@/api/accessToken";

jest.mock("js-cookie");
const mokedCookies = Cookies as jest.Mocked<typeof Cookies>;

beforeEach(() => {
  jest.clearAllMocks();
});

describe("accessToken", () => {
  const TOKEN_COOKIE_KEY = "access_token";

  it("setToken saves token to cookie", () => {
    const token = "access_token";

    setToken(token);

    expect(mokedCookies.set).toHaveBeenCalledWith(TOKEN_COOKIE_KEY, token);
  });

  it("getToken returns token from cookie", () => {
    const token = "access_token";
    // @ts-ignore
    mokedCookies.get.mockImplementation((key: string): string | undefined => {
      return {
        [TOKEN_COOKIE_KEY]: token,
      }[key];
    });

    const result = getToken();

    expect(result).toBe(token);
  });

  it("getToken returns undefined when token empty", () => {
    // @ts-ignore
    mokedCookies.get.mockImplementation((key: string): string | undefined => {
      return {
        [TOKEN_COOKIE_KEY]: "",
      }[key];
    });

    const result = getToken();

    expect(result).toBe(undefined);
  });

  it("dropToken writes empty string to cookie", () => {
    dropToken();

    expect(mokedCookies.set).toBeCalledWith(TOKEN_COOKIE_KEY, "");
  });

  it("isAuthenticated depends on availability of token in cookie", () => {
    // @ts-ignore
    mokedCookies.get.mockReturnValueOnce("token");
    // @ts-ignore
    mokedCookies.get.mockReturnValueOnce("");
    // @ts-ignore
    mokedCookies.get.mockReturnValueOnce(undefined);

    expect(isAuthenticated()).toBe(true);
    expect(isAuthenticated()).toBe(false);
    expect(isAuthenticated()).toBe(false);
  });
});
