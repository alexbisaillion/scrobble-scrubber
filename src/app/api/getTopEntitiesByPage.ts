import { getTopEntities, GetTopEntitiesParams } from "./getTopEntities";
import { TopAlbumsData } from "./numAlbums/isTopAlbumsData";
import { TopArtistsData } from "./numArtists/isTopArtistsData";
import { TopTracksData } from "./numTracks/isTopTracksData";
import { isValidationError, validateSearchParams } from "./validators";

export const getTopEntitiesByPage = async <
  T extends TopTracksData | TopAlbumsData | TopArtistsData,
  V
>(
  params: GetTopEntitiesParams<T, V>
) => {
  const { req } = params;

  const searchParams = validateSearchParams<{ page: number }>(req, ["page"]);
  if (isValidationError(searchParams)) {
    return Response.json(searchParams);
  }

  const { page } = searchParams;
  return getTopEntities({ ...params, page });
};
