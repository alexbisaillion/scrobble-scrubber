import { EntityType } from "../types";
import { LoadingBar } from "./common";

type DuplicatesLoadingBar = {
  entityType: EntityType;
  percentage: number;
  numEntitiesLoaded: number;
  numEntities: number;
};

export const DuplicatesLoadingBar = ({
  entityType,
  percentage,
  numEntities,
  numEntitiesLoaded,
}: DuplicatesLoadingBar) => {
  const text = numEntities
    ? `Loaded ${numEntitiesLoaded}/${numEntities} ${entityType}`
    : "Initializing...";

  return (
    <>
      <LoadingBar percentage={percentage} />
      <span>{text}</span>
    </>
  );
};
