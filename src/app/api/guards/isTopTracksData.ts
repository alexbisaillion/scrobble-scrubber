export type TopTracksData = {
  toptracks: {
    "@attr": { total: string };
    track: { artist: { name: string }; name: string }[];
  };
};

export const isTopTracksData = (data: unknown): data is TopTracksData => {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  if (
    !("toptracks" in data) ||
    typeof data.toptracks !== "object" ||
    data.toptracks === null
  ) {
    return false;
  }

  const toptracks = data.toptracks as Record<string, unknown>;

  if (
    !("@attr" in toptracks) ||
    typeof toptracks["@attr"] !== "object" ||
    toptracks["@attr"] === null
  ) {
    return false;
  }

  const attr = toptracks["@attr"] as Record<string, unknown>;

  if (!("total" in attr) || typeof attr["total"] !== "string") {
    return false;
  }

  if (!("track" in toptracks) || !Array.isArray(toptracks["track"])) {
    return false;
  }

  const tracks = toptracks["track"] as unknown[];

  return tracks.every(
    (track): track is { artist: { name: string }; name: string } =>
      typeof track === "object" &&
      track !== null &&
      "artist" in track &&
      typeof track.artist === "object" &&
      track.artist !== null &&
      "name" in track.artist &&
      typeof track.artist.name === "string" &&
      "name" in track &&
      typeof track.name === "string",
  );
};
