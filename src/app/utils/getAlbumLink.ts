import { Album } from "../types";
import { encodeStr } from "./encodeStr";

export const getAlbumLink = ({ name, artist }: Album, user: string) => {
  return `https://www.last.fm/user/${user}/library/music/${encodeStr(
    artist
  )}/${encodeStr(name)}`;
};
