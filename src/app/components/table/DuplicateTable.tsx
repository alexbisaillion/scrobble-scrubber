import { DuplicateMatch } from "@/app/types";
import { JSX } from "react";
import { DuplicateRow } from "./DuplicateRow";

type DuplicateTableProps<T> = {
  duplicates: DuplicateMatch<T>[];
  user: string;
  getEntityDisplayText: (entity: T) => string;
  getEntityLink: (entity: T, user: string) => string;
  tableHeader?: JSX.Element;
};

export const DuplicateTable = <T,>({
  duplicates,
  user,
  getEntityDisplayText,
  getEntityLink,
  tableHeader,
}: DuplicateTableProps<T>) => {
  return (
    <table className="w-full border-collapse border border-gray-600">
      {tableHeader}
      <tbody>
        {duplicates.map((duplicate, index) => {
          const { entityA, entityB } = duplicate;
          const key = `${getEntityDisplayText(entityA)}-${getEntityDisplayText(
            entityB,
          )}`;
          return (
            <DuplicateRow
              key={key}
              duplicate={duplicate}
              getEntityDisplayText={getEntityDisplayText}
              getEntityLink={getEntityLink}
              isEvenRowNumber={index % 2 === 0}
              user={user}
            />
          );
        })}
      </tbody>
    </table>
  );
};
