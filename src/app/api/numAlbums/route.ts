import { isTopAlbumsData } from "../guards";
import { getTopEntities } from "../getTopEntities";

export async function GET(req: Request) {
  return getTopEntities({
    req,
    method: "user.getTopAlbums",
    typeGuard: isTopAlbumsData,
    extractor: (data) => parseInt(data["topalbums"]["@attr"]["total"]),
    limit: 1,
  });
}
