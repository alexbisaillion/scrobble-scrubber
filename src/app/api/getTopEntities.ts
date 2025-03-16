import { fetchLastFmData } from "./fetchLastFmData";
import { TopAlbumsData, TopArtistsData, TopTracksData } from "./guards";
import { isValidationError, validateEnv, ValidationError } from "./validators";

export type GetTopEntitiesParams<T, U> = {
  method: "user.getTopTracks" | "user.getTopAlbums" | "user.getTopArtists";
  typeGuard: (data: unknown) => data is T;
  extractor: (data: T) => U;
  user: string;
  limit: number;
  page?: number;
};
export const getTopEntities = async <
  T extends TopTracksData | TopAlbumsData | TopArtistsData,
  U
>(
  params: GetTopEntitiesParams<T, U>
): Promise<U | ValidationError> => {
  const { method, typeGuard, extractor, user, limit, page } = params;
  const envCheck = validateEnv();
  if (isValidationError(envCheck)) {
    return envCheck;
  }

  const { LAST_FM_API_KEY } = envCheck;

  const requestParams = {
    method,
    user,
    limit,
    ...(page !== undefined ? { page } : undefined),
  };

  const data = await fetchLastFmData<T>(
    requestParams,
    LAST_FM_API_KEY,
    typeGuard
  );
  if (isValidationError(data)) {
    return data;
  }

  return extractor(data);
};
