import { isTopArtistsData } from "../guards";
import { getTopEntitiesByPage } from "../getTopEntitiesByPage";

export async function GET(req: Request) {
  return getTopEntitiesByPage({
    req,
    method: "user.getTopArtists",
    typeGuard: isTopArtistsData,
    extractor: (data) => data.topartists.artist.map(({ name }) => ({ name })),
    limit: 50,
  });
}
