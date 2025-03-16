import { getDuplicates } from "./getDuplicates";
import { getPartitionedEntities } from "./getPartitionedEntities";

type GetPartitionedDuplicatesParams = {
  entities: {
    artist: string;
    name: string;
  }[];
  isDuplicateEntity: (
    entity1: string,
    entity2: string,
    useRules: boolean
  ) => boolean;
  useRules: boolean;
};

export const getPartitionedDuplicates = ({
  entities,
  isDuplicateEntity,
  useRules,
}: GetPartitionedDuplicatesParams) => {
  const partitions = getPartitionedEntities(entities);
  const duplicates: Map<string, { entity1: string; entity2: string }[]> =
    new Map();
  for (const [artist, entities] of partitions) {
    const matches = getDuplicates({
      entities,
      isDuplicateEntity,
      useRules,
    });
    if (matches.length) {
      duplicates.set(artist, matches);
    }
  }
  return duplicates;
};
