import { isTopAlbumsData } from "../guards";
import { getTopEntitiesByPage } from "../getTopEntitiesByPage";

export async function GET(req: Request) {
  return getTopEntitiesByPage({
    req,
    method: "user.getTopAlbums",
    typeGuard: isTopAlbumsData,
    extractor: (data) =>
      data.topalbums.album.map(({ artist, name }) => ({
        artist: artist.name,
        name,
      })),
    limit: 50,
  });
}
