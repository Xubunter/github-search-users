// import { Record, Static, String } from "runtypes";

export function assertIsExhausted(error: never): never {
  return error;
}

export class ApiUnknownError {
  private __brand = ApiUnknownError;
  constructor(public details: { message?: string } = { message: "Неизвестная ошибка" }) {}
}

export class ApiValidateError {
  private __brand = ApiUnknownError;
  constructor(public details: { message?: string } = { message: "Ошибка валидации" }) {}
}

export class ApiForbiddenError {
  private __brand = ApiForbiddenError;
}

export class ApiLimitError {
  private __brand = ApiLimitError;
  constructor(public wait: number = 15000) {}
}

export class ApiAuthenticationError {
  private __brand = ApiAuthenticationError;
}

export class ApiNotFoundError {
  private __brand = ApiNotFoundError;
}
