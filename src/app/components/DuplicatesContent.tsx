import { JSX } from "react";
import {
  getAlbums,
  getArtists,
  getNumAlbums,
  getNumArtists,
  getNumTracks,
  getTracks,
  ValidationError,
} from "../api";
import { Album, Artist, EntityType, Track } from "../types";
import { DuplicatesLifecycle } from "./DuplicatesLifecycle";

type EntityTypeMap = {
  tracks: Track;
  albums: Album;
  artists: Artist;
};

type DuplicatesContentProps<T extends EntityType> = {
  user: string;
  entityType: T;
  reset: () => void;
};

const entityMethods: {
  [K in EntityType]: {
    getNumEntities: (user: string) => Promise<number | ValidationError>;
    getEntities: (
      user: string,
      page: number
    ) => Promise<EntityTypeMap[K][] | ValidationError>;
    renderDuplicates: (entities: EntityTypeMap[K][]) => JSX.Element;
  };
} = {
  tracks: {
    getNumEntities: getNumTracks,
    getEntities: getTracks,
    renderDuplicates: (tracks) => <span>{tracks.length}</span>,
  },
  albums: {
    getNumEntities: getNumAlbums,
    getEntities: getAlbums,
    renderDuplicates: (albums) => <span>{albums.length}</span>,
  },
  artists: {
    getNumEntities: getNumArtists,
    getEntities: getArtists,
    renderDuplicates: (artists) => <span>{artists.length}</span>,
  },
};

export const DuplicatesContent = <T extends EntityType>({
  user,
  entityType,
  reset,
}: DuplicatesContentProps<T>) => {
  const { getNumEntities, getEntities, renderDuplicates } =
    entityMethods[entityType];

  return (
    <DuplicatesLifecycle<EntityTypeMap[T]>
      entityType={entityType}
      user={user}
      reset={reset}
      getNumEntities={getNumEntities}
      getEntities={getEntities}
      renderDuplicates={renderDuplicates}
    />
  );
};
