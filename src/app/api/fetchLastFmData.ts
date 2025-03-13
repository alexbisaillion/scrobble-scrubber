import { getRequestOptions, RequestParams } from "./getRequestOptions";
import { ValidationError } from "./validators/types";

export const fetchLastFmData = async <T>(
  params: RequestParams,
  apiKey: string,
  typeGuard: (data: unknown) => data is T
): Promise<ValidationError | T> => {
  const { url, headers } = getRequestOptions({ params, apiKey });

  const response = await fetch(url, { headers });
  if (response.status !== 200) {
    return {
      error: "Client error: last.fm API validation failed.",
      status: 400,
    };
  }

  const data = await response.json();

  if (!typeGuard(data)) {
    return {
      error: "Server error: unexpected result from last.fm API.",
      status: 500,
    };
  }

  return data;
};
