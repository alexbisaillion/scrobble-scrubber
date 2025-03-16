export type EntityType = "tracks" | "albums" | "artists";

export type Track = {
  name: string;
  artist: string;
};

export type Album = {
  name: string;
  artist: string;
};

export type Artist = {
  name: string;
};

export type Entity = Track | Album | Artist;
