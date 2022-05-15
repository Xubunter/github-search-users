import Cookies from "js-cookie";

const TOKEN_COOKIE_KEY = "access_token";

export function setToken(token: string): void {
  Cookies.set(TOKEN_COOKIE_KEY, token);
}
export function getToken(): string | undefined {
  const token = Cookies.get(TOKEN_COOKIE_KEY);
  return token || undefined;
}

export function dropToken(): void {
  setToken("");
}

export function isAuthenticated(): boolean {
  return Boolean(getToken());
}
