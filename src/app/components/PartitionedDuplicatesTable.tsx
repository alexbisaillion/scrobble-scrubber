import { getPartitionedDuplicates } from "../logic";
import { Album, Track } from "../types";

type PartitionedDuplicatesTableProps = {
  entities: Album[] | Track[];
  isDuplicateEntity: (
    entityA: string,
    entityB: string,
    useRules: boolean
  ) => boolean;
};

export const PartitionedDuplicatesTable = ({
  entities,
  isDuplicateEntity,
}: PartitionedDuplicatesTableProps) => {
  const duplicates = getPartitionedDuplicates({
    entities,
    isDuplicateEntity,
    useRules: true,
  });

  return (
    <>
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
                    {entity1}
                  </td>
                  <td className="px-4 py-2 w-1/2 border-t border-gray-600">
                    {entity2}
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
