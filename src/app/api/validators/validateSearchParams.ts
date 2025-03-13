import { ValidationError } from "./types";

export const validateSearchParams = <T extends Record<string, string | number>>(
  req: Request,
  keys: (keyof T)[]
): T | ValidationError => {
  const { searchParams } = new URL(req.url);
  const result = {} as T;

  for (const key of keys) {
    const value = searchParams.get(key as string);

    if (!value) {
      return {
        error: `Client error: ${String(key)} not provided.`,
        status: 400,
      };
    }

    result[key] = (
      isNaN(Number(value)) ? value : Number(value)
    ) as T[typeof key];
  }

  return result;
};
