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
import { PartitionedDuplicatesTable } from "./PartitionedDuplicatesTable";
import {
  isDuplicateAlbum,
  isDuplicateArtist,
  isDuplicateTrack,
} from "../logic";
import { getAlbumLink, getArtistLink, getTrackLink } from "../utils";
import { DuplicatesTable } from "./DuplicatesTable";

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
    renderDuplicates: (
      entities: EntityTypeMap[K][],
      user: string
    ) => JSX.Element;
  };
} = {
  tracks: {
    getNumEntities: getNumTracks,
    getEntities: getTracks,
    renderDuplicates: (tracks, user) => (
      <PartitionedDuplicatesTable
        user={user}
        entities={tracks}
        isDuplicateEntity={isDuplicateTrack}
        getEntityLink={getTrackLink}
      />
    ),
  },
  albums: {
    getNumEntities: getNumAlbums,
    getEntities: getAlbums,
    renderDuplicates: (albums, user) => (
      <PartitionedDuplicatesTable
        user={user}
        entities={albums}
        isDuplicateEntity={isDuplicateAlbum}
        getEntityLink={getAlbumLink}
      />
    ),
  },
  artists: {
    getNumEntities: getNumArtists,
    getEntities: getArtists,
    renderDuplicates: (artists, user) => (
      <DuplicatesTable
        user={user}
        entities={artists.map(({ name }) => name)}
        isDuplicateEntity={isDuplicateArtist}
        getEntityLink={getArtistLink}
      />
    ),
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
