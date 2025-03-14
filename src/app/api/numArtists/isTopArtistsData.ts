export type TopArtistsData = { topartists: { "@attr": { total: string } } };

export const isTopArtistsData = (data: unknown): data is TopArtistsData => {
  return (
    typeof data === "object" &&
    data !== null &&
    "topartists" in data &&
    typeof (data as { topartists: unknown }).topartists === "object" &&
    "@attr" in (data as { topartists: { "@attr": unknown } }).topartists &&
    typeof (data as { topartists: { "@attr": { total: string } } }).topartists[
      "@attr"
    ] === "object" &&
    "total" in
      (data as { topartists: { "@attr": { total: string } } }).topartists[
        "@attr"
      ]
  );
};
