export const getPartitionedEntities = <T extends { artist: string }>(
  entities: T[],
) => {
  const resultsByArtists = new Map<string, T[]>();
  entities.forEach((entity) => {
    const { artist } = entity;
    const artistEntry = resultsByArtists.get(artist);
    if (artistEntry) {
      artistEntry.push(entity);
    } else {
      resultsByArtists.set(artist, [entity]);
    }
  });

  return resultsByArtists;
};
