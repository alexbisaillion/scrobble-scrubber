export type ValidationError = { error: string; status: 500 | 400 };

export const isValidationError = <T extends object>(
  result: T | ValidationError
): result is ValidationError => "error" in result;
