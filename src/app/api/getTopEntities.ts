import { fetchLastFmData } from "./fetchLastFmData";
import { TopAlbumsData } from "./numAlbums/isTopAlbumsData";
import { TopArtistsData } from "./numArtists/isTopArtistsData";
import { TopTracksData } from "./numTracks/isTopTracksData";
import {
  isValidationError,
  validateEnv,
  validateSearchParams,
} from "./validators";

export type GetTopEntitiesParams<T, U> = {
  req: Request;
  method: "user.getTopTracks" | "user.getTopAlbums" | "user.getTopArtists";
  typeGuard: (data: unknown) => data is T;
  extractor: (data: T) => U;
  limit: number;
  page?: number;
};
export const getTopEntities = async <
  T extends TopTracksData | TopAlbumsData | TopArtistsData,
  V
>(
  params: GetTopEntitiesParams<T, V>
) => {
  const { req, method, typeGuard, extractor, limit, page } = params;
  const envCheck = validateEnv();
  if (isValidationError(envCheck)) {
    return Response.json(envCheck);
  }

  const searchParams = validateSearchParams<{ user: string }>(req, ["user"]);
  if (isValidationError(searchParams)) {
    return Response.json(searchParams);
  }

  const { LAST_FM_API_KEY } = envCheck;
  const { user } = searchParams;

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
    return Response.json(data);
  }

  return Response.json(extractor(data));
};
