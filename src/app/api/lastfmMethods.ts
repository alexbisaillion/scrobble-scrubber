"use server";

import { getTopEntities } from "./getTopEntities";
import { isTopAlbumsData, isTopArtistsData, isTopTracksData } from "./guards";

export const getNumTracks = async (user: string) => {
  return getTopEntities({
    method: "user.getTopTracks",
    typeGuard: isTopTracksData,
    extractor: (data) => parseInt(data["toptracks"]["@attr"]["total"]),
    user,
    limit: 1,
  });
};

export const getNumAlbums = async (user: string) => {
  return getTopEntities({
    method: "user.getTopAlbums",
    typeGuard: isTopAlbumsData,
    extractor: (data) => parseInt(data["topalbums"]["@attr"]["total"]),
    user,
    limit: 1,
  });
};

export const getNumArtists = async (user: string) => {
  return getTopEntities({
    method: "user.getTopArtists",
    typeGuard: isTopArtistsData,
    extractor: (data) => parseInt(data["topartists"]["@attr"]["total"]),
    user,
    limit: 1,
  });
};

export const getTracks = async (user: string, page: number) => {
  return getTopEntities({
    method: "user.getTopTracks",
    typeGuard: isTopTracksData,
    extractor: (data) =>
      data.toptracks.track.map(({ artist, name }) => ({
        artist: artist.name,
        name: name,
      })),
    user,
    limit: 1000,
    page,
  });
};

export const getAlbums = async (user: string, page: number) => {
  return getTopEntities({
    method: "user.getTopAlbums",
    typeGuard: isTopAlbumsData,
    extractor: (data) =>
      data.topalbums.album.map(({ artist, name }) => ({
        artist: artist.name,
        name,
      })),
    user,
    limit: 1000,
    page,
  });
};

export const getArtists = async (user: string, page: number) => {
  return getTopEntities({
    method: "user.getTopArtists",
    typeGuard: isTopArtistsData,
    extractor: (data) => data.topartists.artist.map(({ name }) => ({ name })),
    user,
    limit: 1000,
    page,
  });
};
