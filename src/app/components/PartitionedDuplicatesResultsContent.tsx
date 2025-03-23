import { useState } from "react";
import { getPartitionedDuplicates } from "../logic";
import { SummaryCard } from "./SummaryCard";
import { Toggle } from "./Toggle";
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

  const duplicates = getPartitionedDuplicates({
    entities,
    isDuplicateEntity,
    sortEntities,
    useRules,
    getPartitionedEntities,
  });

  return (
    <>
      <Toggle isEnabled={useRules} onToggle={setUseRules} label="Use rules" />
      <SummaryCard
        duplicates={[...duplicates.values()].flat()}
        getEntityJsonRepresentation={getEntityJsonRepresentation}
        getHeaders={getHeaders}
      />
      {[...duplicates.entries()].map(([key, matches]) => (
        <div key={key} className="flex flex-col items-center w-full space-y-4">
          <DuplicateTable
            tableHeader={<DuplicateTableHeader header={key} />}
            duplicates={matches}
            getEntityDisplayText={getEntityDisplayText}
            getEntityLink={getEntityLink}
            user={user}
          />
        </div>
      ))}
    </>
  );
};
