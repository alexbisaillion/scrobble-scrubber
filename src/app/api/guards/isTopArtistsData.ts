export type TopArtistsData = {
  topartists: {
    "@attr": { total: string };
    artist: { name: string }[];
  };
};

export const isTopArtistsData = (data: unknown): data is TopArtistsData => {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  // Validate 'topartists'
  if (
    !("topartists" in data) ||
    typeof data.topartists !== "object" ||
    data.topartists === null
  ) {
    return false;
  }

  const topartists = data.topartists as Record<string, unknown>;

  // Validate '@attr'
  if (
    !("@attr" in topartists) ||
    typeof topartists["@attr"] !== "object" ||
    topartists["@attr"] === null
  ) {
    return false;
  }

  const attr = topartists["@attr"] as Record<string, unknown>;

  if (!("total" in attr) || typeof attr["total"] !== "string") {
    return false;
  }

  // Validate 'artist'
  if (!("artist" in topartists) || !Array.isArray(topartists["artist"])) {
    return false;
  }

  const artists = topartists["artist"] as unknown[];

  return artists.every(
    (artist): artist is { name: string } =>
      typeof artist === "object" &&
      artist !== null &&
      "name" in artist &&
      typeof artist.name === "string",
  );
};
