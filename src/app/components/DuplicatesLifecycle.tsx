import { useGetAllEntities, UseGetDuplicatesProps } from "../hooks";
import { DuplicatesLoadingBar } from "./DuplicatesLoadingBar";

type DuplicatesLifecycleProps<T> = {
  entityType: "tracks" | "albums" | "artists";
  reset: () => void;
} & UseGetDuplicatesProps<T>;

export const DuplicatesLifecycle = <T,>({
  entityType,
  reset,
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
      return <span>loaded</span>;
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
      <button
        className="px-4 py-2 bg-blue-500 cursor-pointer text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-blue-600 dark:hover:bg-blue-700"
        onClick={reset}
      >
        Reset
      </button>
      {renderContent()}
    </>
  );
};
