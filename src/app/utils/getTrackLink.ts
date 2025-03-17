import { Track } from "../types";
import { encodeStr } from "./encodeStr";

export const getTrackLink = ({ name, artist }: Track, user: string) => {
  return `https://www.last.fm/user/${user}/library/music/${encodeStr(
    artist
  )}/_/${encodeStr(name)}`;
};
