import { getRequestOptions } from "../getRequestOptions";

export async function GET(req: Request) {
  const { LAST_FM_API_KEY, LAST_FM_SHARED_SECRET } = process.env;

  if (!LAST_FM_API_KEY || !LAST_FM_SHARED_SECRET) {
    return Response.json(
      JSON.stringify({ error: "Internal server error: API key not found." }),
      {
        status: 500,
      }
    );
  }

  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");

  if (!username) {
    return Response.json(
      { error: "Client error: username not provided." },
      {
        status: 400,
      }
    );
  }

  const { url, headers } = getRequestOptions({
    params: { method: "user.getTopTracks", user: username, limit: 1 },
    apiKey: LAST_FM_API_KEY,
  });

  const response = await fetch(url, { headers });
  if (response.status !== 200) {
    return Response.json(
      { error: "Client error: invalid username." },
      {
        status: 400,
      }
    );
  }

  const data = await response.json();
  const numTracks = parseInt(data["toptracks"]["@attr"]["total"]);

  return Response.json(numTracks);
}
