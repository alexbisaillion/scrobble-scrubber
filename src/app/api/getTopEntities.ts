import { fetchLastFmData } from "./fetchLastFmData";
import { RequestParams } from "./getRequestOptions";
import { TopAlbumsData } from "./numAlbums/isTopAlbumsData";
import { TopArtistsData } from "./numArtists/isTopArtistsData";
import { TopTracksData } from "./numTracks/isTopTracksData";
import {
  isValidationError,
  validateEnv,
  validateSearchParams,
} from "./validators";

type GetTopEntitiesParams<T, U> = {
  req: Request;
  method: "user.getTopTracks" | "user.getTopAlbums" | "user.getTopArtists";
  typeGuard: (data: unknown) => data is T;
  extractor: (data: T) => U;
};
export const getTopEntities = async <
  T extends TopTracksData | TopAlbumsData | TopArtistsData,
  V
>(
  params: GetTopEntitiesParams<T, V>
) => {
  const { req, method, typeGuard, extractor } = params;
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
  const requestParams: RequestParams = { method, user, limit: 1 };

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
