import { rest } from "./rest";
import { User } from "@/types/User";
import {
  ApiAuthenticationError,
  ApiForbiddenError,
  ApiUnknownError,
} from "@/types/Errors";
import { Static } from "runtypes";
import { left, right, Either } from "@sweet-monads/either";

type AccountResponseSeccess = Static<typeof User>;
type AccountResponseErrors =
  | ApiUnknownError
  | ApiAuthenticationError
  | ApiForbiddenError;

export function fetchAccount(): Promise<
  Either<AccountResponseErrors, AccountResponseSeccess>
> {
  return rest
    .get("user")
    .then((res) => {
      if (User.guard(res.data)) {
        return right(res.data);
      }

      return left(new ApiUnknownError({ message: "Ошибка валидации" }));
    })
    .catch((e) => {
      if (e.code === "401") return left(new ApiAuthenticationError());
      if (e.code === "403") return left(new ApiForbiddenError());

      console.error(e);
      return left(new ApiUnknownError());
    });
}
