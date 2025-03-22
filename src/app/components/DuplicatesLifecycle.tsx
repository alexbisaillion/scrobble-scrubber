import { JSX } from "react";
import { useGetAllEntities, UseGetAllEntitiesProps } from "../hooks";
import { EntityType } from "../types";
import { DuplicatesLoadingBar } from "./DuplicatesLoadingBar";
import { Button } from "./Button";

type DuplicatesLifecycleProps<T> = {
  entityType: EntityType;
  reset: () => void;
  renderDuplicates: (entities: T[], user: string) => JSX.Element;
} & UseGetAllEntitiesProps<T>;

export const DuplicatesLifecycle = <T,>({
  entityType,
  reset,
  renderDuplicates,
  user,
  getEntities,
  getNumEntities,
}: DuplicatesLifecycleProps<T>) => {
  const { entities, loadedPercentage, error } = useGetAllEntities({
    user,
    getNumEntities,
    getEntities,
  });

  const hasLoaded = loadedPercentage >= 1 && !error;

  const renderContent = () => {
    if (error) {
      return <span>An error occurred - {error} Please try again.</span>;
    }

    if (hasLoaded) {
      return renderDuplicates(entities, user);
    }

    return (
      <DuplicatesLoadingBar
        entityType={entityType}
        percentage={loadedPercentage}
        numEntities={entities.length}
        numEntitiesLoaded={entities.filter((entity) => entity !== null).length}
      />
    );
  };

  return (
    <>
      <Button label="Reset" fill="bg-blue-600" onClick={reset} />
      {renderContent()}
    </>
  );
};
