import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getToken } from "./accessToken";

export const API_BASE_URL = "https://api.github.com/";

const tokenInterseptor = {
  request(request: AxiosRequestConfig) {
    const token = getToken();

    if (token) {
      if (!request.headers) request.headers = {};
      request.headers["Authorization"] = "Bearer " + token;
    }
    return request;
  },
  response(response: AxiosResponse) {
    return response;
  },
};
const rest = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
  },
});

rest.interceptors.request.use(tokenInterseptor.request);
rest.interceptors.response.use(tokenInterseptor.response);

export { rest };
