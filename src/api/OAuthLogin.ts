import { ApiUnknownError } from "@/types/Errors";
import { Either, left, right } from "@sweet-monads/either";
import { Record, String } from "runtypes";
import { dropToken, setToken } from "./accessToken";
import { rest } from "./rest";

const OAuthLoginResponse = Record({
  access_token: String,
});

export const GITHUB_BASE_URL = "https://github.com/";

export function getOAuthLoginLink(): string {
  const url = new URL("login/oauth/authorize", GITHUB_BASE_URL);
  url.searchParams.set("client_id", process.env.VUE_APP_CLIENT_ID);
  return url.href;
}

export class OAuthLoginTokenError {
  private __brand = OAuthLoginTokenError;
}

type OAuthLoginResponseSuccess = boolean;
type OAuthLoginResponseErrors = OAuthLoginTokenError | ApiUnknownError;

export function OAuthLogin(
  access_code: string
): Promise<Either<OAuthLoginResponseErrors, OAuthLoginResponseSuccess>> {
  return rest
    .post(
      "/login/oauth/access_token",
      {
        client_id: process.env.VUE_APP_CLIENT_ID,
        client_secret: process.env.VUE_APP_CLIENT_SECRET,
        code: access_code,
      },
      {
        baseURL: GITHUB_BASE_URL,
      }
    )
    .then((res) => {
      if (OAuthLoginResponse.guard(res.data)) {
        setToken(res.data.access_token);
        return right(true);
      }
      return left(new OAuthLoginTokenError());
    })
    .catch((e) => {
      console.error(e);
      return left(new ApiUnknownError());
    });
}

export function OAuthLogout(): void {
  dropToken();
}
