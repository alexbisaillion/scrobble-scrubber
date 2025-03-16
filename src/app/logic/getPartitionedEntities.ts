export const getPartitionedEntities = (
  entities: { artist: string; name: string }[]
) => {
  const resultsByArtists = new Map<string, string[]>();
  entities.forEach(({ artist, name }) => {
    const artistEntry = resultsByArtists.get(artist);
    if (artistEntry) {
      artistEntry.push(name);
    } else {
      resultsByArtists.set(artist, [name]);
    }
  });

  return resultsByArtists;
};
