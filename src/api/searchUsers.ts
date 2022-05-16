import { rest } from "./rest";
import { SearchUser } from "@/types/User";
import { ApiLimitError, ApiUnknownError, ApiValidateError } from "@/types/Errors";
import { Array, Boolean, Number, Record, Static } from "runtypes";
import { left, right, Either } from "@sweet-monads/either";

type ListUsersParams = {
  page?: number;
  per_page?: number;
  name?: string;
};

const SearchUsersResponseSeccess = Record({
  incomplete_results: Boolean,
  items: Array(SearchUser),
  total_count: Number,
});

type SearchUsersResponseSeccess = Static<typeof SearchUsersResponseSeccess>;
type SearchUsersResponseErrors = ApiUnknownError | ApiValidateError | ApiLimitError;

export function searchUsers(
  params: ListUsersParams = {}
): Promise<Either<SearchUsersResponseErrors, SearchUsersResponseSeccess>> {
  const q = `${params.name || ""} in:login type:user`;

  return rest
    .get("search/users", {
      params: {
        q,
        ...params,
      },
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    })
    .then((res) => {
      if (SearchUsersResponseSeccess.guard(res.data)) {
        return right(res.data);
      }

      return left(new ApiValidateError({ message: "Ошибка валидации" }));
    })
    .catch((e) => {
      // You have exceeded a secondary rate limit. Please wait a few minutes before you try again.
      if (e.code === "ERR_BAD_REQUEST") return left(new ApiLimitError());
      console.error(e);
      return left(new ApiUnknownError());
    });
}
