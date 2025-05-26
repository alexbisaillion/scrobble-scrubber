import { compareTwoStrings } from "./compareTwoStrings";

const featKeywords = ["feat. ", "feat ", "ft. ", "ft ", "with ", "featuring "];
const romanNumVals: Record<string, number> = {
  m: 1000,
  f: 500,
  c: 100,
  l: 50,
  x: 10,
  v: 5,
  i: 1,
};
const exemptKeywords = [
  "remix",
  "mix",
  "instrumental",
  "live",
  "edit",
  "alt",
  "demo",
  "version",
  "a cappella",
  "interlude",
  "reprise",
  "continued",
  "single",
  "acoustic",
];
const albumKeywords = [
  "deluxe",
  "expanded",
  "extended",
  "single",
  " ep",
  "tour edition",
  "explicit version",
  "deluxe version",
  "expanded version",
  "extended version",
  "deluxe edition",
  "expanded edition",
  "extended edition",
  "bonus track",
  "special edition",
];

export function isDuplicateTrack(
  track1: string,
  track2: string,
  useRules: boolean
) {
  if (track1.toLocaleLowerCase() === track2.toLocaleLowerCase()) {
    // Skip exact matches -- some Last.fm libraries have exact matches.
    // Unsure why but it appears to affect soundtracks quite a bit.
    return false;
  }

  if (!useRules) {
    return compareTwoStrings(track1, track2) > 0.5;
  }

  track1 = track1.toLowerCase();
  track2 = track2.toLowerCase();
  if (compareTwoStrings(track1, track2) < 0.5) {
    if (!track1.startsWith(track2) && !track2.startsWith(track1)) {
      return false;
    }
  }
  if (isExempt(track1, track2, exemptKeywords)) {
    return false;
  }
  return isMatched(track1, track2);
}

export function isDuplicateAlbum(
  album1: string,
  album2: string,
  useRules: boolean
) {
  if (album1.toLocaleLowerCase() === album2.toLocaleLowerCase()) {
    // Skip exact matches -- some Last.fm libraries have exact matches.
    // Unsure why but it appears to affect soundtracks quite a bit.
    return false;
  }

  if (!useRules) {
    return compareTwoStrings(album1, album2) > 0.5;
  }

  album1 = album1.toLowerCase();
  album2 = album2.toLowerCase();

  album1 = stripAlbumTag(album1);
  album2 = stripAlbumTag(album2);

  if (compareTwoStrings(album1, album2) < 0.5) {
    if (!album1.startsWith(album2) && !album2.startsWith(album1)) {
      return false;
    }
  }
  if (isExempt(album1, album2, exemptKeywords)) {
    return false;
  }
  return isMatched(album1, album2);
}

export function isDuplicateArtist(
  artist1: string,
  artist2: string,
  useRules: boolean
) {
  if (artist1.toLocaleLowerCase() === artist2.toLocaleLowerCase()) {
    // Skip exact matches -- some Last.fm libraries have exact matches.
    // Unsure why but it appears to affect soundtracks quite a bit.
    return false;
  }

  if (!useRules) {
    return compareTwoStrings(artist1, artist2) > 0.5;
  }

  artist1 = artist1.toLowerCase();
  artist2 = artist2.toLowerCase();

  if (compareTwoStrings(artist1, artist2) < 0.5) {
    if (!artist1.startsWith(artist2) && !artist2.startsWith(artist1)) {
      return false;
    }
  }

  if (analyzeArtistList(artist1, artist2)) {
    return true;
  }
  return isMatched(artist1, artist2);
}

function isExempt(track1: string, track2: string, exemptKeywords: string[]) {
  for (const keyword of exemptKeywords) {
    const isTrack1Matched = track1.includes(keyword);
    const isTrack2Matched = track2.includes(keyword);
    if (
      (isTrack1Matched && !isTrack2Matched) ||
      (isTrack2Matched && !isTrack1Matched)
    ) {
      return true;
    }
  }
  return false;
}

function isMatched(str1: string, str2: string) {
  let track1Features;
  if (containsFeatureTag(str1)) {
    track1Features = getFeaturedArtists(str1);
  }

  let track2Features;
  if (containsFeatureTag(str2)) {
    track2Features = getFeaturedArtists(str2);
  }

  if (track1Features && track2Features) {
    if (compareTwoStrings(track1Features, track2Features) < 0.5) {
      return false;
    }

    let excess1 = str1.replace(track1Features, "");
    let excess2 = str2.replace(track2Features, "");

    excess1 = stripNonAlphaNumeric(excess1);
    excess2 = stripNonAlphaNumeric(excess2);

    excess1 = stripExcessWhitespace(excess1);
    excess2 = stripExcessWhitespace(excess2);

    if (excess1 && excess2 && !analyzeFeatureTagExcess(excess1, excess2)) {
      return false;
    }
  }

  str1 = stripNonAlphaNumeric(str1);
  str2 = stripNonAlphaNumeric(str2);

  str1 = stripRemasteredTag(str1);
  str2 = stripRemasteredTag(str2);

  str1 = stripFeatureTag(str1);
  str2 = stripFeatureTag(str2);

  str1 = stripExcessWhitespace(str1);
  str2 = stripExcessWhitespace(str2);

  const words = getWords(str1, str2);

  if (words.split1.length === 1 && words.split2.length === 1) {
    return words.split1[0] === words.split2[0];
  }
  return analyzeWords(words.split1, words.split2);
}

function stripNonAlphaNumeric(str: string) {
  str = str.replace(/:|\//g, " "); // it is likely that a slash or a colon separates two words, so the words should be kept separate
  return str.replace(/[^A-Za-z0-9\s]/g, "");
}

function stripExcessWhitespace(str: string) {
  return str.replace(/\s\s+/g, " ").trim();
}

function getWords(str1: string, str2: string) {
  const split1 = str1.split(" ");
  const split2 = str2.split(" ");

  const length = split1.length > split2.length ? split1.length : split2.length;
  // Search for extraneous words within the string, starting at the second word
  for (let i = 0; i < length; i++) {
    if (!split1[i] || !split2[i]) {
      break;
    }

    if (compareTwoStrings(split1[i], split2[i]) < 0.5) {
      if (
        split1[i + 1] &&
        compareTwoStrings(split1[i + 1], split2[i]) >
          compareTwoStrings(split1[i], split2[i]) &&
        !exemptKeywords.includes(split1[i + 1])
      ) {
        split1.splice(i, 1);
        i--;
      } else if (
        split2[i + 1] &&
        compareTwoStrings(split2[i + 1], split1[i]) >
          compareTwoStrings(split2[i], split1[i]) &&
        !exemptKeywords.includes(split2[i + 1])
      ) {
        split2.splice(i, 1);
        i--;
      }
    }
  }
  return { split1: split1, split2: split2 };
}

function analyzeWords(split1: string[], split2: string[]) {
  if (split1.length !== split2.length) {
    return false;
  }

  for (let i = 0; i < split1.length; i++) {
    if (
      !isNaN(parseInt(split1[i])) &&
      !isNaN(parseInt(split2[i])) &&
      split1[i] !== split2[i]
    ) {
      return false;
    }
    if (!isNaN(parseInt(split1[i])) && isNaN(parseInt(split2[i]))) {
      if (
        isRomanNum(split2[i]) &&
        convertRomanNumToInt(split2[i]) === parseInt(split1[i])
      ) {
        continue;
      }
    }
    if (isNaN(parseInt(split1[i])) && !isNaN(parseInt(split2[i]))) {
      if (
        isRomanNum(split1[i]) &&
        convertRomanNumToInt(split1[i]) === parseInt(split2[i])
      ) {
        continue;
      }
    }
    if (
      (split1[i] === "pt" || split1[i] === "part") &&
      (split2[i] === "pt" || split2[i] === "part")
    ) {
      continue;
    }

    if (compareTwoStrings(split1[i], split2[i]) < 0.8) {
      return false;
    }
  }
  return true;
}

function containsFeatureTag(str: string) {
  for (const featKeyword of featKeywords) {
    if (str.includes(featKeyword)) {
      return true;
    }
  }
  return false;
}

function getFeaturedArtists(str: string) {
  if (str.includes("(") || str.includes("[")) {
    const matches = [];
    const roundBracketMatches = str.match(/\(([^)]+)\)/g);
    if (roundBracketMatches) {
      matches.push(...roundBracketMatches);
    }
    const squareBracketMatches = str.match(/\[(.*?)\]/g);
    if (squareBracketMatches) {
      matches.push(...squareBracketMatches);
    }
    for (const match of matches) {
      for (const featKeyword of featKeywords) {
        if (match.includes(featKeyword)) {
          return match.replace(featKeyword, "").replace(/\[|\]|\(|\)/g, "");
        }
      }
    }
  } else {
    for (const featKeyword of featKeywords) {
      if (str.includes(featKeyword)) {
        return str.substring(
          str.indexOf(featKeyword) + featKeyword.length,
          str.length
        );
      }
    }
  }
}

function stripFeatureTag(str: string) {
  for (const featKeyword of [" feat ", " ft ", " with ", " featuring "]) {
    if (str.includes(featKeyword)) {
      str = str.substring(0, str.indexOf(featKeyword));
      break;
    }
  }
  return str;
}

function stripRemasteredTag(str: string) {
  for (const remasteredKeyword of ["remastered", "remaster"]) {
    if (str.includes(remasteredKeyword)) {
      str = str.substring(0, str.indexOf(remasteredKeyword));
      str = stripYears(str);
      break;
    }
  }
  return str;
}

function stripYears(str: string) {
  return str.replace(/\s*\b\d{4}\b/g, "");
}

function analyzeFeatureTagExcess(str1: string, str2: string) {
  let cutoff1;
  let cutoff2;
  for (const featKeyword of featKeywords) {
    if (str1.includes(featKeyword)) {
      cutoff1 = str1.substring(
        str1.indexOf(featKeyword) + featKeyword.length,
        str1.length
      );
    }
    if (str2.includes(featKeyword)) {
      cutoff2 = str2.substring(
        str2.indexOf(featKeyword) + featKeyword.length,
        str2.length
      );
    }
  }

  if (cutoff1 && cutoff2) {
    const words = getWords(cutoff1, cutoff2);
    if (!analyzeWords(words.split1, words.split2)) {
      return false;
    }
  }
  return true;
}

function isRomanNum(num: string) {
  if (num === null || !(typeof num[Symbol.iterator] === "function")) {
    return false;
  }
  for (const char of num) {
    if (!(char in romanNumVals)) {
      return false;
    }
  }
  return true;
}

function convertRomanNumToInt(romanNum: string) {
  return romanNum
    .split("")
    .reduce(
      (acc, cur, idx, src) =>
        acc +
        (romanNumVals[cur] < romanNumVals[src[idx + 1]]
          ? -romanNumVals[cur]
          : romanNumVals[cur]),
      0
    );
}

function stripAlbumTag(str: string) {
  for (const albumTag of albumKeywords) {
    if (str.includes(albumTag)) {
      str = str.substring(0, str.indexOf(albumTag));
      break;
    }
  }
  str = str.replace("vol.", "");
  return str;
}

function analyzeArtistList(artist1: string, artist2: string) {
  const isArtist1List = artist1.includes("&") || artist1.includes(",");
  const isArtist2List = artist2.includes("&") || artist2.includes(",");
  if (isArtist1List) {
    const artists1 = artist1
      .split(/,|&/g)
      .map((str) => stripExcessWhitespace(str));
    if (isArtist2List) {
      const artists2 = stripExcessWhitespace(artist2)
        .split(/,|&/g)
        .map((str) => stripExcessWhitespace(str));
      if (artists1.filter((artist) => artists2.includes(artist)).length > 0) {
        return true;
      }
    } else {
      if (artists1.includes(artist2)) {
        return true;
      }
    }
  } else if (isArtist2List) {
    const artists2 = stripExcessWhitespace(artist2)
      .split(/,|&/g)
      .map((str) => stripExcessWhitespace(str));
    if (artists2.includes(artist1)) {
      return true;
    }
  }
  return false;
}
