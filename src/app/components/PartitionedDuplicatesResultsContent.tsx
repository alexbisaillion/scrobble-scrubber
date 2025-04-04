import { useMemo, useState } from "react";
import { getPartitionedDuplicates } from "../logic";
import { SummaryCard } from "./SummaryCard";
import { Button, Toggle } from "./common";
import { DuplicateTable, DuplicateTableHeader } from "./table";

type PartitionedDuplicatesTableProps<T> = {
  user: string;
  entities: T[];
  isDuplicateEntity: (entityA: T, entityB: T, useRules: boolean) => boolean;
  getEntityDisplayText: (entity: T) => string;
  getEntityLink: (entity: T, user: string) => string;
  getPartitionedEntities: (entities: T[]) => Map<string, T[]>;
  sortEntities: (entityA: T, entityB: T) => number;
  getHeaders: () => string[];
  getEntityJsonRepresentation: (entity: T) => Record<string, string>;
};

export const PartitionedDuplicatesResultsContent = <T,>({
  user,
  entities,
  isDuplicateEntity,
  getEntityDisplayText,
  getEntityLink,
  getPartitionedEntities,
  sortEntities,
  getHeaders,
  getEntityJsonRepresentation,
}: PartitionedDuplicatesTableProps<T>) => {
  const [useRules, setUseRules] = useState(true);

  const duplicates = useMemo(
    () =>
      getPartitionedDuplicates({
        entities,
        isDuplicateEntity,
        sortEntities,
        useRules,
        getPartitionedEntities,
      }),
    [
      entities,
      isDuplicateEntity,
      sortEntities,
      useRules,
      getPartitionedEntities,
    ]
  );

  const [tableIndex, setTableIndex] = useState(0);

  const incrementTableIndex = () => {
    setTableIndex((prevIndex) => (prevIndex + 1) % duplicates.length);
  };

  const decrementTableIndex = () => {
    setTableIndex(
      (prevIndex) => (prevIndex - 1 + duplicates.length) % duplicates.length
    );
  };

  const renderTable = () => {
    if (duplicates.length === 0) {
      return <div>No duplicates found</div>;
    }

    const [key, matches] = duplicates[tableIndex];

    return (
      <DuplicateTable
        tableHeader={<DuplicateTableHeader header={key} />}
        duplicates={matches}
        getEntityDisplayText={getEntityDisplayText}
        getEntityLink={getEntityLink}
        user={user}
      />
    );
  };

  return (
    <>
      <Toggle
        isEnabled={useRules}
        onToggle={(value) => {
          setTableIndex(0);
          setUseRules(value);
        }}
        label="Use rules"
      />
      <SummaryCard
        duplicates={[...duplicates.map(([, list]) => list)].flat()}
        getEntityJsonRepresentation={getEntityJsonRepresentation}
        getHeaders={getHeaders}
      />
      <div className="flex gap-4">
        <Button
          onClick={decrementTableIndex}
          fill="bg-blue-600"
          label="Previous"
        />
        <Button onClick={incrementTableIndex} fill="bg-blue-600" label="Next" />
      </div>
      {renderTable()}
    </>
  );
};
