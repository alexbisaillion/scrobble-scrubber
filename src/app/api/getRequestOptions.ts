type GetTopParams = {
  user: string;
  limit: number;
  page?: number;
};

type GetTopTracksParams = {
  method: "user.getTopTracks";
} & GetTopParams;

type GetTopAlbumsParams = {
  method: "user.getTopAlbums";
} & GetTopParams;

type GetTopArtistsParams = {
  method: "user.getTopArtists";
} & GetTopParams;

type RequestParams =
  | GetTopTracksParams
  | GetTopAlbumsParams
  | GetTopArtistsParams;

type GetURLParams = { params: RequestParams; apiKey: string };

const getURL = ({ params, apiKey }: GetURLParams) => {
  const url = new URL("http://ws.audioscrobbler.com/2.0/");
  for (const [param, value] of Object.entries(params)) {
    const parsedValue = typeof value === "string" ? value : value.toString();
    url.searchParams.append(param, parsedValue);
  }
  url.searchParams.append("format", "json");
  url.searchParams.append("api_key", apiKey);
  return url;
};

export const getRequestOptions = (params: GetURLParams) => {
  return {
    url: getURL(params),
    headers: {
      "User-Agent": "split-scrobble-finder",
    },
  };
};
