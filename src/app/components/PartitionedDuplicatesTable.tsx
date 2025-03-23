import { useState } from "react";
import { getPartitionedDuplicates } from "../logic";
import { SummaryCard } from "./SummaryCard";
import { Toggle } from "./Toggle";

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

export const PartitionedDuplicatesTable = <T,>({
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
          <table className="w-full border-collapse border border-gray-600">
            <thead>
              <tr className="bg-gray-700 text-gray-200">
                <th
                  colSpan={2}
                  className="px-4 py-3 text-center text-lg font-semibold"
                >
                  {key}
                </th>
              </tr>
            </thead>
            <tbody>
              {matches.map(({ entityA, entityB }, index) => (
                <tr
                  key={`${getEntityDisplayText(entityA)}-${getEntityDisplayText(
                    entityB
                  )}`}
                  className={index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"}
                >
                  <td className="px-4 py-2 w-1/2 border-t border-gray-600">
                    <a
                      className="hover:opacity-75"
                      href={getEntityLink(entityA, user)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {getEntityDisplayText(entityA)}
                    </a>
                  </td>
                  <td className="px-4 py-2 w-1/2 border-t border-gray-600">
                    <a
                      className="hover:opacity-75"
                      href={getEntityLink(entityB, user)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {getEntityDisplayText(entityB)}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </>
  );
};
