export type TopAlbumsData = { topalbums: { "@attr": { total: string } } };

export const isTopAlbumsData = (data: unknown): data is TopAlbumsData => {
  return (
    typeof data === "object" &&
    data !== null &&
    "topalbums" in data &&
    typeof (data as { topalbums: unknown }).topalbums === "object" &&
    "@attr" in (data as { topalbums: { "@attr": unknown } }).topalbums &&
    typeof (data as { topalbums: { "@attr": { total: string } } }).topalbums[
      "@attr"
    ] === "object" &&
    "total" in
      (data as { topalbums: { "@attr": { total: string } } }).topalbums["@attr"]
  );
};
