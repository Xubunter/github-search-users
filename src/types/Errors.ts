// import { Record, Static, String } from "runtypes";

export function assertIsExhausted(error: never): never {
  return error;
}

// export const ApiUnknownError = Record({
//   message: String,
// }).withBrand("E_UNKNOWN");
// export const ApiUnknownErrorFactory = (details: { message?: string }) =>
//   ApiUnknownError.check({ message: details.message || "Неизвестная ошибка" });

// export const ApiForbiddenError = Record({}).withBrand("E_FORBIDDEN");
// export const ApiForbiddenErrorFactory = () => ApiForbiddenError.check({});

// export const ApiAuthenticationError = Record({}).withBrand("E_AUTHENTICATION");
// export const ApiAuthenticationErrorFactory = () =>
//   ApiAuthenticationError.check({});

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

export class ApiAuthenticationError {
  private __brand = ApiAuthenticationError;
}
