import { getTopEntitiesByPage } from "../getTopEntitiesByPage";
import { isTopTracksData } from "../numTracks/isTopTracksData";

export async function GET(req: Request) {
  return getTopEntitiesByPage({
    req,
    method: "user.getTopTracks",
    typeGuard: isTopTracksData,
    extractor: (data) =>
      data.toptracks.track.map(({ artist, name }) => ({
        artist: artist.name,
        name: name,
      })),
    limit: 50,
  });
}
