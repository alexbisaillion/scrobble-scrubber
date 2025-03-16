import { sortEntities } from "./sortEntities";

type GetDuplicatesParams = {
  entities: string[];
  isDuplicateEntity: (
    entity1: string,
    entity2: string,
    useRules: boolean
  ) => boolean;
  useRules: boolean;
};

export const getDuplicates = ({
  entities,
  isDuplicateEntity,
  useRules,
}: GetDuplicatesParams) => {
  entities.sort((entityA, entityB) => sortEntities(entityA, entityB));
  const matches: { entity1: string; entity2: string }[] = [];
  for (let i = 0; i < entities.length - 1; i++) {
    if (isDuplicateEntity(entities[i], entities[i + 1], useRules)) {
      matches.push({ entity1: entities[i], entity2: entities[i + 1] });
    }
  }
  return matches;
};
