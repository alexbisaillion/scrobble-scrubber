export const compareTwoStrings = (str1: string, str2: string): number => {
  if (str1 === str2) return 1;
  if (!str1 || !str2) return 0;

  const bigram = (str: string): Set<string> => {
    const pairs = new Set<string>();
    for (let i = 0; i < str.length - 1; i++) {
      pairs.add(str.slice(i, i + 2));
    }
    return pairs;
  };

  const bigrams1 = bigram(str1);
  const bigrams2 = bigram(str2);
  const intersection = new Set(
    [...bigrams1].filter((bigram) => bigrams2.has(bigram))
  );

  return (2 * intersection.size) / (bigrams1.size + bigrams2.size);
};
