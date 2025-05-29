export type TopAlbumsData = {
  topalbums: {
    "@attr": { total: string };
    album: { artist: { name: string }; name: string }[];
  };
};

export const isTopAlbumsData = (data: unknown): data is TopAlbumsData => {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  if (
    !("topalbums" in data) ||
    typeof data.topalbums !== "object" ||
    data.topalbums === null
  ) {
    return false;
  }

  const topalbums = data.topalbums as Record<string, unknown>;

  if (
    !("@attr" in topalbums) ||
    typeof topalbums["@attr"] !== "object" ||
    topalbums["@attr"] === null
  ) {
    return false;
  }

  const attr = topalbums["@attr"] as Record<string, unknown>;

  if (!("total" in attr) || typeof attr["total"] !== "string") {
    return false;
  }

  if (!("album" in topalbums) || !Array.isArray(topalbums["album"])) {
    return false;
  }

  const albums = topalbums["album"] as unknown[];

  return albums.every(
    (album): album is { artist: { name: string }; name: string } =>
      typeof album === "object" &&
      album !== null &&
      "artist" in album &&
      typeof album.artist === "object" &&
      album.artist !== null &&
      "name" in album.artist &&
      typeof album.artist.name === "string" &&
      "name" in album &&
      typeof album.name === "string",
  );
};
