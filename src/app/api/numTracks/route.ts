import { RequestParams } from "../getRequestOptions";
import { fetchLastFmData } from "../fetchLastFmData";
import {
  isValidationError,
  validateEnv,
  validateSearchParams,
} from "../validators";
import { isTopTracksData, TopTracksData } from "./isTopTracksData";

export async function GET(req: Request) {
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
  const params: RequestParams = { method: "user.getTopTracks", user, limit: 1 };

  const data = await fetchLastFmData<TopTracksData>(
    params,
    LAST_FM_API_KEY,
    isTopTracksData
  );
  if (isValidationError(data)) {
    return Response.json(data);
  }

  return Response.json(parseInt(data["toptracks"]["@attr"]["total"]));
}
