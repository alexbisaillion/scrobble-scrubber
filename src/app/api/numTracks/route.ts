import { isTopTracksData } from "./isTopTracksData";
import { getTopEntities } from "../getTopEntities";

export async function GET(req: Request) {
  return getTopEntities({
    req,
    method: "user.getTopTracks",
    typeGuard: isTopTracksData,
    extractor: (data) => parseInt(data["toptracks"]["@attr"]["total"]),
  });
}
