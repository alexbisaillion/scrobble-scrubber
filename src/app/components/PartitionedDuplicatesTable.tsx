import { getPartitionedDuplicates } from "../logic";
import { Album, Track } from "../types";
import { SummaryCard } from "./SummaryCard";

type PartitionedDuplicatesTableProps = {
  user: string;
  entities: Album[] | Track[]; // TODO make this type generic
  isDuplicateEntity: (
    entityA: string,
    entityB: string,
    useRules: boolean
  ) => boolean;
  getEntityLink: (entity: Album | Track, user: string) => string;
};

export const PartitionedDuplicatesTable = ({
  user,
  entities,
  isDuplicateEntity,
  getEntityLink,
}: PartitionedDuplicatesTableProps) => {
  const duplicates = getPartitionedDuplicates({
    entities,
    isDuplicateEntity,
    useRules: true,
  });

  return (
    <>
      <SummaryCard duplicates={duplicates} />
      {[...duplicates.entries()].map(([artist, matches]) => (
        <div
          key={artist}
          className="flex flex-col items-center w-full space-y-4"
        >
          <table className="w-full border-collapse border border-gray-600">
            <thead>
              <tr className="bg-gray-700 text-gray-200">
                <th
                  colSpan={2}
                  className="px-4 py-3 text-center text-lg font-semibold"
                >
                  {artist}
                </th>
              </tr>
            </thead>
            <tbody>
              {matches.map(({ entity1, entity2 }, index) => (
                <tr
                  key={`${entity1}-${entity2}`}
                  className={index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"}
                >
                  <td className="px-4 py-2 w-1/2 border-t border-gray-600">
                    <a
                      className="hover:opacity-75"
                      href={getEntityLink(
                        { artist: artist, name: entity1 },
                        user
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {entity1}
                    </a>
                  </td>
                  <td className="px-4 py-2 w-1/2 border-t border-gray-600">
                    <a
                      className="hover:opacity-75"
                      href={getEntityLink(
                        { artist: artist, name: entity2 },
                        user
                      )}
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
        </div>
      ))}
    </>
  );
};
