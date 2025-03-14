import { isTopArtistsData } from "./isTopArtistsData";
import { getTopEntities } from "../getTopEntities";

export async function GET(req: Request) {
  return getTopEntities({
    req,
    method: "user.getTopArtists",
    typeGuard: isTopArtistsData,
    extractor: (data) => parseInt(data["topartists"]["@attr"]["total"]),
    limit: 1,
  });
}
