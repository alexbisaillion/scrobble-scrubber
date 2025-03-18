import { encodeStr } from "./encodeStr";

export const getArtistLink = (artist: string, user: string) => {
  return `https://www.last.fm/user/${user}/library/music/${encodeStr(artist)}`;
};
