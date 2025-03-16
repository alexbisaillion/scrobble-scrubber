import { getNumTracks, getTracks } from "../api";
import { DuplicatesLifecycle } from "./DuplicatesLifecycle";

type DuplicateTableProps = {
  user: string;
  entityType: "tracks" | "albums" | "artists";
  reset: () => void;
};

export const DuplicateTable = ({
  user,
  entityType,
  reset,
}: DuplicateTableProps) => {
  if (entityType === "tracks") {
    return (
      <DuplicatesLifecycle
        entityType={entityType}
        user={user}
        reset={reset}
        getNumEntities={getNumTracks}
        getEntities={getTracks}
      />
    );
  }
  return <></>;
};
