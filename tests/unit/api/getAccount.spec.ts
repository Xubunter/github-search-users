import { fetchAccount } from "@/api/getAccount";
import { rest } from "@/api/rest";
import { ApiAuthenticationError, ApiForbiddenError, ApiUnknownError, ApiValidateError } from "@/types/Errors";
import { User } from "@/types/User";

jest.mock("@/api/rest");
const mockedRest = rest as jest.Mocked<typeof rest>;

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
  jest.clearAllMocks();
});

describe("fetchAccount", () => {
  it("returns user", async () => {
    mockedRest.get.mockResolvedValue({ data: { ...USER } });

    const response = await fetchAccount();

    expect(response.isRight()).toBe(true);
    expect(response.value).toEqual(USER);
  });

  it("returns ApiUnknownError if response is invalid", async () => {
    mockedRest.get.mockResolvedValue({ data: { invalid_user: true } });

    const response = await fetchAccount();

    expect(response.isLeft()).toBe(true);
    expect(response.value).toBeInstanceOf(ApiValidateError);
  });

  it("returns ApiError if API request rejected", async () => {
    mockedRest.get.mockRejectedValueOnce({ code: "401" });
    mockedRest.get.mockRejectedValueOnce({ code: "403" });
    mockedRest.get.mockRejectedValueOnce({});

    const responseWithError401 = await fetchAccount();
    const responseWithError403 = await fetchAccount();
    const responseWithError = await fetchAccount();

    expect(responseWithError401.value).toBeInstanceOf(ApiAuthenticationError);
    expect(responseWithError403.value).toBeInstanceOf(ApiForbiddenError);
    expect(responseWithError.value).toBeInstanceOf(ApiUnknownError);
  });
});
