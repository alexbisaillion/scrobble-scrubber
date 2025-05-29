import { DuplicateMatch } from "../types";
import { getDuplicates, GetDuplicatesParams } from "./getDuplicates";

type GetPartitionedDuplicatesParams<T> = GetDuplicatesParams<T> & {
  getPartitionedEntities: (entities: T[]) => Map<string, T[]>;
};

export const getPartitionedDuplicates = <T>({
  entities,
  isDuplicateEntity,
  sortEntities,
  useRules,
  getPartitionedEntities,
}: GetPartitionedDuplicatesParams<T>): [string, DuplicateMatch<T>[]][] => {
  const partitions = getPartitionedEntities(entities);
  const duplicates: Map<string, DuplicateMatch<T>[]> = new Map();
  for (const [artist, entities] of partitions) {
    const matches = getDuplicates({
      entities,
      isDuplicateEntity,
      sortEntities,
      useRules,
    });
    if (matches.length) {
      duplicates.set(artist, matches);
    }
  }

  const allPartitions = [...duplicates.entries()];

  allPartitions.sort(
    ([, matchesA], [, matchesB]) => matchesB.length - matchesA.length,
  );

  return allPartitions;
};
