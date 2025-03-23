import { useState } from "react";
import { getDuplicates } from "../logic";
import { SummaryCard } from "./SummaryCard";
import { Toggle } from "./Toggle";

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

export const DuplicatesTable = <T,>({
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
      <table className="w-full border-collapse border border-gray-600">
        <tbody>
          {duplicates.map(({ entityA, entityB }, index) => (
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
    </>
  );
};
