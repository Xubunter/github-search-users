import { rest } from "./rest";
import { Repository } from "@/types/Repository";
import { ApiUnknownError, ApiValidateError } from "@/types/Errors";
import { Static, Array } from "runtypes";
import { left, right, Either } from "@sweet-monads/either";

type ListRepositoriesParams = {
  page?: number;
  per_page?: number;
  sort?: "full_name" | "created" | "updated" | "pushed";
};

type UserRepositoriesSeccess = Static<typeof Repository>[];
type UserRepositoriesErrors = ApiUnknownError | ApiValidateError;

export function getUserRepositories(
  username: string,
  params: ListRepositoriesParams = {}
): Promise<Either<UserRepositoriesErrors, UserRepositoriesSeccess>> {
  return rest
    .get(`users/${username}/repos`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
      params,
    })
    .then((res) => {
      console.log(res);
      if (Array(Repository).guard(res.data)) {
        return right(res.data);
      }

      return left(new ApiValidateError({ message: "Ошибка валидации" }));
    })
    .catch((e) => {
      console.error(e);
      return left(new ApiUnknownError());
    });
}
