import { useState } from "react";
import { getDuplicates } from "../logic";
import { SummaryCard } from "./SummaryCard";
import { Toggle } from "./common";
import { DuplicateTable } from "./table";

type DuplicatesTableProps<T> = {
  user: string;
  entities: T[];
  isDuplicateEntity: (entityA: T, entityB: T, useRules: boolean) => boolean;
  getEntityDisplayText: (entity: T) => string;
  getEntityLink: (entity: T, user: string) => string;
  sortEntities: (entityA: T, entityB: T) => number;
  getHeaders: () => string[];
  getEntityJsonRepresentation: (entity: T) => Record<string, string>;
};

export const DuplicateResultsContent = <T,>({
  user,
  entities,
  isDuplicateEntity,
  getEntityDisplayText,
  getEntityLink,
  sortEntities,
  getHeaders,
  getEntityJsonRepresentation,
}: DuplicatesTableProps<T>) => {
  const [useRules, setUseRules] = useState(true);

  const duplicates = getDuplicates({
    entities,
    isDuplicateEntity,
    sortEntities,
    useRules,
  });

  return (
    <>
      <Toggle isEnabled={useRules} onToggle={setUseRules} label="Use rules" />
      <SummaryCard
        duplicates={duplicates}
        getEntityJsonRepresentation={getEntityJsonRepresentation}
        getHeaders={getHeaders}
      />
      <DuplicateTable
        duplicates={duplicates}
        getEntityDisplayText={getEntityDisplayText}
        getEntityLink={getEntityLink}
        user={user}
      />
    </>
  );
};
