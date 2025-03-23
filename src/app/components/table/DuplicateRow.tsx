import { DuplicateMatch } from "@/app/types";
import { DuplicateCell } from "./DuplicateCell";

type DuplicateRowProps<T> = {
  duplicate: DuplicateMatch<T>;
  user: string;
  getEntityDisplayText: (entity: T) => string;
  getEntityLink: (entity: T, user: string) => string;
  isEvenRowNumber: boolean;
};

export const DuplicateRow = <T,>({
  duplicate,
  getEntityDisplayText,
  getEntityLink,
  user,
  isEvenRowNumber,
}: DuplicateRowProps<T>) => {
  const { entityA, entityB } = duplicate;

  const renderCell = (entity: T) => {
    return (
      <DuplicateCell
        entity={entity}
        user={user}
        getEntityDisplayText={getEntityDisplayText}
        getEntityLink={getEntityLink}
      />
    );
  };

  return (
    <tr className={isEvenRowNumber ? "bg-gray-800" : "bg-gray-700"}>
      {renderCell(entityA)}
      {renderCell(entityB)}
    </tr>
  );
};
