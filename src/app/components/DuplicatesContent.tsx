import {
  getAlbums,
  getArtists,
  getNumAlbums,
  getNumArtists,
  getNumTracks,
  getTracks,
} from "../api";
import { EntityType } from "../types";
import { DuplicatesLifecycle } from "./DuplicatesLifecycle";

type DuplicatesContentProps = {
  user: string;
  entityType: EntityType;
  reset: () => void;
};

const entityMethods = {
  tracks: { getNumEntities: getNumTracks, getEntities: getTracks },
  albums: { getNumEntities: getNumAlbums, getEntities: getAlbums },
  artists: { getNumEntities: getNumArtists, getEntities: getArtists },
};

export const DuplicatesContent = ({
  user,
  entityType,
  reset,
}: DuplicatesContentProps) => {
  const { getNumEntities, getEntities } = entityMethods[entityType];

  return (
    <DuplicatesLifecycle
      entityType={entityType}
      user={user}
      reset={reset}
      getNumEntities={getNumEntities}
      getEntities={getEntities}
    />
  );
};
