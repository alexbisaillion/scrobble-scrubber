import { getDuplicates } from "../logic";
import { SummaryCard } from "./SummaryCard";

type DuplicatesTableProps = {
  user: string;
  entities: string[];
  isDuplicateEntity: (
    entityA: string,
    entityB: string,
    useRules: boolean
  ) => boolean;
  getEntityLink: (entity: string, user: string) => string;
};

export const DuplicatesTable = ({
  user,
  entities,
  isDuplicateEntity,
  getEntityLink,
}: DuplicatesTableProps) => {
  const duplicates = getDuplicates({
    entities,
    isDuplicateEntity,
    useRules: true,
  });

  return (
    <>
      <SummaryCard duplicates={duplicates} />
      <table className="w-full border-collapse border border-gray-600">
        <tbody>
          {duplicates.map(({ entity1, entity2 }, index) => (
            <tr
              key={`${entity1}-${entity2}`}
              className={index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"}
            >
              <td className="px-4 py-2 w-1/2 border-t border-gray-600">
                <a
                  className="hover:opacity-75"
                  href={getEntityLink(entity1, user)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {entity1}
                </a>
              </td>
              <td className="px-4 py-2 w-1/2 border-t border-gray-600">
                <a
                  className="hover:opacity-75"
                  href={getEntityLink(entity2, user)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {entity2}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
