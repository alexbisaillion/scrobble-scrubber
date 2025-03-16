export const sortEntities = (entityA: string, entityB: string) => {
  entityA = entityA
    .replace(/:|\//g, " ")
    .replace(/[^A-Za-z0-9\s]/g, "")
    .toLowerCase();
  entityB = entityB
    .replace(/:|\//g, " ")
    .replace(/[^A-Za-z0-9\s]/g, "")
    .toLowerCase();
  if (entityA > entityB) {
    return 1;
  } else if (entityA < entityB) {
    return -1;
  }
  return 0;
};
