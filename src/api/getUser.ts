import { rest } from "./rest";
import { User } from "@/types/User";
import { ApiNotFoundError, ApiUnknownError, ApiValidateError } from "@/types/Errors";
import { Static } from "runtypes";
import { left, right, Either } from "@sweet-monads/either";

type UserResponseSeccess = Static<typeof User>;
type UserResponseErrors = ApiUnknownError | ApiValidateError | ApiNotFoundError;

export function getUser(username: string): Promise<Either<UserResponseErrors, UserResponseSeccess>> {
  return rest
    .get(`users/${username}`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    })
    .then((res) => {
      if (User.guard(res.data)) {
        return right(res.data);
      }

      return left(new ApiValidateError({ message: "Ошибка валидации" }));
    })
    .catch((e) => {
      if (e.code === "404") return left(new ApiNotFoundError());

      console.error(e);
      return left(new ApiUnknownError());
    });
}
