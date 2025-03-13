export type TopTracksData = { toptracks: { "@attr": { total: string } } };

export const isTopTracksData = (data: unknown): data is TopTracksData => {
  return (
    typeof data === "object" &&
    data !== null &&
    "toptracks" in data &&
    typeof (data as { toptracks: unknown }).toptracks === "object" &&
    "@attr" in (data as { toptracks: { "@attr": unknown } }).toptracks &&
    typeof (data as { toptracks: { "@attr": { total: string } } }).toptracks[
      "@attr"
    ] === "object" &&
    "total" in
      (data as { toptracks: { "@attr": { total: string } } }).toptracks["@attr"]
  );
};
