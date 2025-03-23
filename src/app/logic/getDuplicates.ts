import { DuplicateMatch } from "../types";

export type GetDuplicatesParams<T> = {
  entities: T[];
  isDuplicateEntity: (entityA: T, entityB: T, useRules: boolean) => boolean;
  sortEntities: (entityA: T, entityB: T) => number;
  useRules: boolean;
};

export const getDuplicates = <T>({
  entities,
  isDuplicateEntity,
  sortEntities,
  useRules,
}: GetDuplicatesParams<T>) => {
  entities.sort(sortEntities);
  const matches: DuplicateMatch<T>[] = [];
  for (let i = 0; i < entities.length - 1; i++) {
    if (isDuplicateEntity(entities[i], entities[i + 1], useRules)) {
      matches.push({ entityA: entities[i], entityB: entities[i + 1] });
    }
  }
  return matches;
};
