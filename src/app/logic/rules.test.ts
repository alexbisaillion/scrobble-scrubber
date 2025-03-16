import { isDuplicateAlbum, isDuplicateArtist, isDuplicateTrack } from "./rules";

describe("Check if the isDuplicateTrack method successfully detects duplicates", () => {
  test("Check if a track with an excess feature tag is a duplicate", () => {
    expect(
      isDuplicateTrack(
        "See You Again",
        "See You Again (feat. Kali Uchis)",
        true
      )
    ).toBe(true);
  });
  test("Check if a track with an extraneous tag and an excess feature tag is a duplicate", () => {
    expect(
      isDuplicateTrack(
        "Int'l Players Anthem (I Choose You)",
        "Int'l Players Anthem (I Choose You) (feat. Outkast)",
        true
      )
    ).toBe(true);
  });
  test("Check if a track with excess spaces is a duplicate ", () => {
    expect(
      isDuplicateTrack(
        "Vibin' Out with ((( O )))",
        "Vibin' out with (((O)))",
        true
      )
    ).toBe(true);
  });
  test("Check if a track with an altered list of featured artists is a duplicate", () => {
    expect(
      isDuplicateTrack(
        "Izayah (feat. Key!, Maxo Kream & Denzel Curry)",
        "Izayah (feat. Key!, Maxo Kream, Denzel Curry & Kenny Beats)",
        true
      )
    ).toBe(true);
  });
  test("Check if a track with altered parentheses is a duplicate", () => {
    expect(
      isDuplicateTrack(
        "Never Bend (Remix) (feat. Lil Uzi Vert)",
        "Never Bend (Remix) [feat. Lil Uzi Vert]",
        true
      )
    ).toBe(true);
  });
  test("Check if a track with excess non alphanumeric characters is a duplicate", () => {
    expect(
      isDuplicateTrack(
        "V. 3005 (beach picnic version)",
        "V. 3005 - Beach Picnic Version",
        true
      )
    ).toBe(true);
  });
  test("Check if a track with excess abbreviation is a duplicate", () => {
    expect(isDuplicateTrack("Drunk In L.A.", "Drunk in LA", true)).toBe(true);
  });
  test("Check if interlude with different nonalphanumeric characters is a duplicate", () => {
    expect(
      isDuplicateTrack(
        "Brand New Tyga (Interlude)",
        "Brand New Tyga - Interlude",
        true
      )
    ).toBe(true);
  });
  test("Check if same track with different apostrophe is a duplicate", () => {
    expect(
      isDuplicateTrack(
        "You're Either On Something",
        "You’re Either On Something",
        true
      )
    ).toBe(true);
  });
  test("Check if same track with different quotation marks is a duplicate", () => {
    expect(
      isDuplicateTrack(
        '1985 (Intro to "The Fall Off")',
        "1985 - Intro to “The Fall Off”",
        true
      )
    ).toBe(true);
  });
  test("Check if track using feat instead of with is a duplicate", () => {
    expect(
      isDuplicateTrack(
        "Only 1 (Interlude) (with Travis Scott)",
        "Only 1 (Interlude) [feat. Travis Scott]",
        true
      )
    ).toBe(true);
  });
  test("Check if track using g-dropping is a duplicate", () => {
    expect(
      isDuplicateTrack(
        "Livin' Underwater (Is Somethin' Wild)",
        "Livin’ Underwater (Is Something Wild)",
        true
      )
    ).toBe(true);
  });
  test("FINISH EM ZEL | F1N1ZH EM ZEL", () => {
    expect(
      isDuplicateTrack(
        "SIRENS l Z1RENZ (feat. J.I.D)",
        "SIRENS | Z1RENZ [FEAT. J.I.D | J.1.D]",
        true
      )
    ).toBe(true);
  });
  test("Check if track with extra text is a duplicate", () => {
    expect(
      isDuplicateTrack(
        "Bedtime Stories (Feat. The Weeknd)",
        "Bedtime Stories (feat. The Weeknd) - From SR3MM",
        true
      )
    ).toBe(true);
  });
  test("Check if feature tags using different nonalphanumeric characters are duplicates", () => {
    expect(
      isDuplicateTrack(
        "Flying Overseas (feat. Devonte Hynes And Solange Knowles)",
        "Flying Overseas - feat. Devonte Hynes And Solange Knowles",
        true
      )
    ).toBe(true);
  });
  test("Check if remix with excess feature tag is a duplicate", () => {
    expect(
      isDuplicateTrack(
        "Drunk In Love Remix",
        "Drunk In Love Remix (feat. Jay Z & Kanye West)",
        true
      )
    ).toBe(true);
  });
  test("Check if extended version with excess feature tag is a duplicate", () => {
    expect(
      isDuplicateTrack(
        "Blessings (Extended Version) [feat. Drake & Kanye West]",
        "Blessings - Extended Version",
        true
      )
    ).toBe(true);
  });
  test("Check if repeated feature tag is a duplicate", () => {
    expect(
      isDuplicateTrack(
        "Palmolive (feat. Pusha T & Killer Mike)",
        "Palmolive feat. Pusha T. & Killer Mike (feat. Pusha T & Killer Mike)",
        true
      )
    ).toBe(true);
  });
  test("Check if tracks using different spelling of 'part' are duplicates", () => {
    expect(
      isDuplicateTrack(
        "Girls, Girls, Girls (Part 2)",
        "Girls, Girls, Girls, Pt. 2",
        true
      )
    ).toBe(true);
  });
  test("Check if track using roman numerals is a duplicate", () => {
    expect(
      isDuplicateTrack(
        "Girls, Girls, Girls, Pt. 2",
        "Girls, Girls, Girls, pt. II",
        true
      )
    ).toBe(true);
  });
  test("Check if the same mix is a duplicate", () => {
    expect(
      isDuplicateTrack(
        "Hey Ya! (Radio Mix/Club Mix)",
        "Hey Ya! - Radio Mix / Club Mix",
        true
      )
    ).toBe(true);
  });
  test("Check if an ampersand instead of 'and' is a duplicate", () => {
    expect(
      isDuplicateTrack(
        "Or Nah (feat. The Weeknd, Wiz Khalifa & DJ Mustard) - Remix",
        "Or Nah (feat. The Weeknd, Wiz Khalifa and DJ Mustard) - Remix",
        true
      )
    ).toBe(true);
  });
  test("Check if featured artists in different order is a duplicate", () => {
    expect(
      isDuplicateTrack(
        "100 Bands (feat. Quavo, 21 Savage, Meek Mill & YG)",
        "100 Bands (feat. Quavo, 21 Savage, YG & Meek Mill)",
        true
      )
    ).toBe(true);
  });
  test("Check if abbreviation not using punctuation is a duplicate", () => {
    expect(
      isDuplicateTrack(
        "Operation Lifesaver a.k.a Mint Test",
        "Operation Lifesaver aka Mint Test",
        true
      )
    ).toBe(true);
  });
  test("Check if special character using different spacing is a duplicate", () => {
    expect(isDuplicateTrack("Music: Response", "Music:Response", true)).toBe(
      true
    );
  });
  test("Check if feature using 'featuring' instead of 'feat' is a duplicate", () => {
    expect(
      isDuplicateTrack(
        "Jailbreak the Tesla (feat. Aminé)",
        "Jailbreak the Tesla featuring Aminé",
        true
      )
    ).toBe(true);
  });
  test("Check if track with excess feature and a title with different casing is a duplicate", () => {
    expect(
      isDuplicateTrack("PrimeTime", "Primetime (feat. Miguel)", true)
    ).toBe(true);
  });
  test("Check if a remastered song is a duplicate", () => {
    expect(
      isDuplicateTrack(
        "Smooth Criminal",
        "Smooth Criminal - 2012 Remaster",
        true
      )
    ).toBe(true);
  });
});

describe("Check if the isDuplicateTrack method successfully detects non duplicates", () => {
  test("Check if tracks with numeric/non-numeric numbering with mismatching numbers are not duplicates", () => {
    expect(isDuplicateTrack("Minus 3", "Minus One", true)).toBe(false);
  });
  test("Check if tracks with numeric numbering with mismatching numbers are not duplicates", () => {
    expect(isDuplicateTrack("The Birds Part 1", "The Birds Part 2", true)).toBe(
      false
    );
  });
  test("Check if tracks with a single different word are not duplicates", () => {
    expect(isDuplicateTrack("Starfruit LA", "Starfruit NYC", true)).toBe(false);
  });
  test("Check if tracks with differing roman numerals are not duplicates", () => {
    expect(
      isDuplicateTrack(
        "Things That Are Bad for Me (Part I)",
        "Things That Are Bad for Me (Part II)",
        true
      )
    ).toBe(false);
  });
  test("Check if tracks with the same remastered tag are not duplicates", () => {
    expect(
      isDuplicateTrack(
        "Hotel California - Eagles 2013 Remaster",
        "Peaceful Easy Feeling - Eagles 2013 Remaster",
        true
      )
    ).toBe(false);
  });
  test("Check if an original mix and an edit are not duplicates", () => {
    expect(
      isDuplicateTrack(
        "Starry Night - Edit",
        "Starry Night - Original Mix",
        true
      )
    ).toBe(false);
  });
  test("Check if tracks with a single different word in parantheses is not a duplicate", () => {
    expect(
      isDuplicateTrack(
        "Bermondsey Bosom (Left)",
        "Bermondsey Bosom (Right)",
        true
      )
    ).toBe(false);
  });
  test("Check if the single version of a track is not a duplicate", () => {
    expect(
      isDuplicateTrack(
        "Somebody's Watching Me",
        "Somebody's Watching Me - Single Version",
        true
      )
    ).toBe(false);
  });
  test("Check if the same track remixed by different artists is not a duplicate", () => {
    expect(
      isDuplicateTrack(
        "Positive Contact - Bonus Track - Charlie Clouser Remix",
        "Positive Contact - Bonus Track - Mario C Remix",
        true
      )
    ).toBe(false);
  });
  test("Check if the same track remixed by different artists using 'with' is not a duplicate", () => {
    expect(
      isDuplicateTrack(
        "OMG (with Carly Rae Jepsen) - Alphalove Remix",
        "OMG (with Carly Rae Jepsen) - Anki Remix",
        true
      )
    ).toBe(false);
  });
  test("Check if remix nested in feature tag is not a duplicate", () => {
    expect(
      isDuplicateTrack(
        "Genius (with Lil Wayne, Sia, Diplo & Labrinth - Lil Wayne Remix)",
        "Genius (with Sia, Diplo & Labrinth)",
        true
      )
    ).toBe(false);
  });
  test("Check if remix following feature tag is not a duplicate", () => {
    expect(
      isDuplicateTrack(
        "In Your Eyes (Feat. Charlotte Day Wilson)",
        "In Your Eyes (feat. Charlotte Day Wilson) - Nosaj Thing Remix)",
        true
      )
    ).toBe(false);
  });
  test("Check if a cappella version is not a duplicate", () => {
    expect(
      isDuplicateTrack(
        "Call Out My Name",
        "Call Out My Name - A Cappella",
        true
      )
    ).toBe(false);
  });
  test("Check if interlude with the same name is not a duplicate", () => {
    expect(
      isDuplicateTrack(
        "All of the Lights",
        "All of the Lights (Interlude)",
        true
      )
    ).toBe(false);
  });
  test("Check if instrumental version is not a duplicate", () => {
    expect(
      isDuplicateTrack("In The City", "In The City (Instrumental)", true)
    ).toBe(false);
  });
  test("Check if reprise is not a duplicate", () => {
    expect(isDuplicateTrack("Liability", "Liability (Reprise)", true)).toBe(
      false
    );
  });
  test("Check if tracks with the same name but different featured artists are not duplicates", () => {
    expect(
      isDuplicateTrack(
        "waves (feat. Kacey Musgraves) - Remix",
        "waves (feat. Travis Scott) - Remix",
        true
      )
    ).toBe(false);
  });
  test("Check if interludes with similar names are not duplicates", () => {
    expect(
      isDuplicateTrack("For Free? - Interlude", "For Sale? (interlude)", true)
    ).toBe(false);
  });
  test("Check if tracks with a name consisting of a single similar word are not duplicates", () => {
    expect(isDuplicateTrack("Insecure", "Insecurity", true)).toBe(false);
  });
  test("Check if different tracks with the same feature are not duplicates", () => {
    expect(
      isDuplicateTrack(
        "Atlantique Sud (feat. Mai Lan)",
        "Bibi the Dog (feat. Mai Lan)",
        true
      )
    ).toBe(false);
  });
  test("Check if a different mix of the same track is not a duplicate", () => {
    expect(
      isDuplicateTrack(
        "So Heavy I Fell Through the Earth - Algorithm Mix",
        "So Heavy I Fell Through the Earth - Art Mix",
        true
      )
    ).toBe(false);
  });
  test("Check if a continued song is not a duplicate", () => {
    expect(
      isDuplicateTrack("Everything Now", "Everything Now (continued)", true)
    ).toBe(false);
  });
  test("Check if another part of a song using roman numerals is not a duplicate", () => {
    expect(isDuplicateTrack("The Face Part I", "The Face Part II", true)).toBe(
      false
    );
  });
  test("Check if an acoustic song is not a duplicate", () => {
    expect(isDuplicateTrack("The Shade", "The Shade - Acoustic", true)).toBe(
      false
    );
  });
  test("Check if the album version of a song is not a duplicate", () => {
    expect(isDuplicateTrack("Tailwhip", "Tailwhip (Album V)", true)).toBe(
      false
    );
  });
  test("Check if the similar interludes are not a duplicates", () => {
    expect(
      isDuplicateTrack("Datwhip (interlude)", "Dntstop (interlude)", true)
    ).toBe(false);
  });
  test("Check if different remix artists are not stripped and marked as a duplicate", () => {
    expect(
      isDuplicateTrack(
        "Sylvia Says (Breakbot Remix)",
        "Sylvia Says (Tensnake Remix)",
        true
      )
    ).toBe(false);
  });
});

describe("Check if the isDuplicateAlbum method successfully detects duplicates", () => {
  test("Check if a deluxe album is a duplicate", () => {
    expect(isDuplicateAlbum("Take Care", "Take Care (Deluxe)", true)).toBe(
      true
    );
  });
  test("Check if an extended album is a duplicate", () => {
    expect(
      isDuplicateAlbum("Pure Heroine (Extended)", "Pure Heroine", true)
    ).toBe(true);
  });
  test("Check if a single with excess feature tag is a duplicate", () => {
    expect(
      isDuplicateAlbum("One Out Of Two", "One Out Of Two (feat. Irfane)", true)
    ).toBe(true);
  });
  test("Check if a single with features listed in different order is a duplicate", () => {
    expect(
      isDuplicateAlbum(
        "Watch (feat. Kanye West & Lil Uzi Vert)",
        "Watch (feat. Lil Uzi Vert & Kanye West)",
        true
      )
    ).toBe(true);
  });
  test("Check if a single with 'single' listed in the title is a duplicate", () => {
    expect(
      isDuplicateAlbum("This Is America", "This Is America - Single", true)
    ).toBe(true);
  });
  test("Check if an EP with 'EP' listed in the title is a duplicate", () => {
    expect(isDuplicateAlbum("Rogue Waves", "Rogue Waves - EP", true)).toBe(
      true
    );
  });
  test("Check if an album with extra nonalphanumeric characters is a duplicate", () => {
    expect(
      isDuplicateAlbum(
        "Born to Die (The Paradise Edition)",
        "Born to Die - The Paradise Edition",
        true
      )
    ).toBe(true);
  });
  test("Check if a single with an excess feature tag listed as 'single' is a duplicate", () => {
    expect(
      isDuplicateAlbum(
        "Drug Dealers Anonymous",
        "Drug Dealers Anonymous (feat. JAY Z) - Single",
        true
      )
    ).toBe(true);
  });
  test("Carly Slay Jepsen", () => {
    expect(
      isDuplicateAlbum("E\u00b7MO\u00b7TION Side B", "EMOTION SIDE B +", true)
    ).toBe(true);
  });
  test("last dinos", () => {
    expect(
      isDuplicateAlbum(
        "In A Million Years",
        "In A Million Years (Tour Edition)",
        true
      )
    ).toBe(true);
  });
  test("Check if album with extra whitespace is a duplicate", () => {
    expect(
      isDuplicateAlbum(
        "Funk Wav Bounces Vol. 1",
        "Funk Wav Bounces Vol.1",
        true
      )
    ).toBe(true);
  });
  test("Check if the explicit version of an album is a duplicate", () => {
    expect(
      isDuplicateAlbum(
        "Man On The Moon II: The Legend Of Mr. Rager (Explicit Version)",
        "Man On The Moon, Vol. II: The Legend Of Mr. Rager",
        true
      )
    ).toBe(true);
  });
  test("Check if an album missing 'vol' is a duplicate", () => {
    expect(
      isDuplicateAlbum(
        "Man On The Moon, Vol. II: The Legend Of Mr. Rager",
        "Man on the Moon II: The Legend of Mr. Rager",
        true
      )
    ).toBe(true);
  });
  test("Check if a deluxe version of an album is a duplicate", () => {
    expect(
      isDuplicateAlbum(
        "Sun Structures",
        "Sun Structures (Deluxe Version)",
        true
      )
    ).toBe(true);
  });
  test("Check if an album using an extra ellipsis is a duplicate", () => {
    expect(
      isDuplicateAlbum(
        "Magna Carta Holy Grail",
        "Magna Carta... Holy Grail",
        true
      )
    ).toBe(true);
  });
  test("Check if an album name with an extra article is a duplicate", () => {
    expect(
      isDuplicateAlbum(
        "Vol. 3: Life and Times of S. Carter",
        "Vol. 3: The Life and Times of S. Carter",
        true
      )
    ).toBe(true);
  });
  test("Check if a deluxe edition of an album is a duplicate", () => {
    expect(
      isDuplicateAlbum(
        "Everything You've Come To Expect (Deluxe Edition)",
        "Everything You\u2019ve Come To Expect",
        true
      )
    ).toBe(true);
  });
  test("Check if an abbreviation without punctuation is a duplicate", () => {
    expect(isDuplicateAlbum("Sept 5th", "Sept. 5th", true)).toBe(true);
  });
  test("Check if an album listed as bonus track is a duplicate", () => {
    expect(
      isDuplicateAlbum(
        "The Bird Of Music",
        "The Bird Of Music (Bonus Track)",
        true
      )
    ).toBe(true);
  });
  test("Check if the expanded and deluxe edition of an album are duplicates", () => {
    expect(
      isDuplicateAlbum(
        "Hip Hop Is Dead (Deluxe Edition)",
        "Hip Hop Is Dead (Expanded Edition)",
        true
      )
    ).toBe(true);
  });
  test("Check if a / with different spacing is a duplicate", () => {
    expect(
      isDuplicateAlbum(
        "Speakerboxxx / The Love Below",
        "Speakerboxxx/The Love Below",
        true
      )
    ).toBe(true);
  });
  test("Check if a special edition of an album is a duplicate", () => {
    expect(
      isDuplicateAlbum(
        "The Bones of What You Believe",
        "The Bones of What You Believe (Special Edition)",
        true
      )
    ).toBe(true);
  });
  test("Check if an expanded edition marked in square brackets is a duplicate", () => {
    expect(
      isDuplicateAlbum(
        "Enter The Wu-Tang (36 Chambers) [Expanded Edition]",
        "Enter the Wu-Tang (36 Chambers)",
        true
      )
    ).toBe(true);
  });
});

describe("Check if the isDuplicateAlbum method successfully detects non duplicates", () => {
  test("Check if an album of instrumentals is not a duplicate", () => {
    expect(
      isDuplicateAlbum("Cherry Bomb", "Cherry Bomb + Instrumentals", true)
    ).toBe(false);
  });
  test("Check if the b sides for two different albums are not duplicates", () => {
    expect(
      isDuplicateAlbum(
        "Currents B-Sides & Remixes",
        "InnerSpeaker B-Sides & Remixes",
        true
      )
    ).toBe(false);
  });
  test("Check if the solo version of a single is not a duplicate", () => {
    expect(isDuplicateAlbum("Biking", "Biking (Solo)", true)).toBe(false);
  });
  test("Check if the b side of an album is not a duplicate", () => {
    expect(
      isDuplicateAlbum(
        "E\u00b7MO\u00b7TION",
        "E\u00b7MO\u00b7TION Side B",
        true
      )
    ).toBe(false);
  });
  test("Check if a remix album is not a duplicate", () => {
    expect(
      isDuplicateAlbum("Human After All", "Human After All (Remixes)", true)
    ).toBe(false);
  });
  test("Check if different remixes of a single are not duplicates", () => {
    expect(
      isDuplicateAlbum(
        "Don't Leave Me Lonely (Claptone Remix)",
        "Don't Leave Me Lonely (Purple Disco Machine Remix)",
        true
      )
    ).toBe(false);
  });
  test("Check if a remix of a single is not a duplicate", () => {
    expect(
      isDuplicateAlbum(
        "Late Night Feelings",
        "Late Night Feelings (Channel Tres Remix)",
        true
      )
    ).toBe(false);
  });
  test("Check if the sequel to an album using numeric characters is not a duplicate", () => {
    expect(isDuplicateAlbum("Luv Is Rage", "Luv Is Rage 2", true)).toBe(false);
  });
  test("Check if the sequel to an album using roman numerals is not a duplicate", () => {
    expect(isDuplicateAlbum("Culture", "Culture II", true)).toBe(false);
  });
  test("Check if the sequel to an album using written words is not a duplicate", () => {
    expect(isDuplicateAlbum("PARTYNEXTDOOR", "PARTYNEXTDOOR TWO", true)).toBe(
      false
    );
  });
  test("Check if two different volumes of an album using roman numerals are not duplicates", () => {
    expect(
      isDuplicateAlbum("Superclean, Vol. I", "Superclean, Vol. II", true)
    ).toBe(false);
  });
  test("Check if an edit of a single is not a duplicate", () => {
    expect(isDuplicateAlbum("Better Now", "Better Now (Edit)", true)).toBe(
      false
    );
  });
  test("Check if two soundtracks by the same artist are not duplicates", () => {
    expect(
      isDuplicateAlbum(
        "Blade Runner 2049 (Original Motion Picture Soundtrack)",
        "The Dark Knight (Collectors Edition) [Original Motion Picture Soundtrack]",
        true
      )
    ).toBe(false);
  });
  test("Check if single remixes by two different artists are not duplicates", () => {
    expect(
      isDuplicateAlbum(
        "Lightenup (Alex Metric Remix)",
        "Lightenup (Breakbot Remix)",
        true
      )
    ).toBe(false);
  });
  test("Check if a remix EP is not a duplicate", () => {
    expect(
      isDuplicateAlbum(
        "For All We Know",
        "For All We Know - The Remixes - EP",
        true
      )
    ).toBe(false);
  });
  test("Check if a live album is not a duplicate", () => {
    expect(
      isDuplicateAlbum("Carrie & Lowell", "Carrie & Lowell Live", true)
    ).toBe(false);
  });
  test('Check if a "reloaded" album is not a duplicate', () => {
    expect(isDuplicateAlbum("88GLAM RELOADED", "88GLAM2", true)).toBe(false);
  });
  test("Check an album with 'ep' in it without actually being an EP is not a duplicate", () => {
    expect(
      isDuplicateAlbum(
        "The Blueprint",
        "The Blueprint 2: The Gift & the Curse",
        true
      )
    ).toBe(false);
  });
});

describe("Check if the isDuplicateArtist method successfully detects duplicates", () => {
  test("Check if an artist contained in a '&' separated list of two artists is a duplicate", () => {
    expect(
      isDuplicateArtist("21 Savage", "21 Savage & Metro Boomin", true)
    ).toBe(true);
  });
  test("Check if an artist contained in a ',' separated list of two artists is a duplicate", () => {
    expect(isDuplicateArtist("Silk City", "Silk City, Dua Lipa", true)).toBe(
      true
    );
  });
  test("Check if an artist contained in two '&' separated lists of artists is a duplicate", () => {
    expect(
      isDuplicateArtist(
        "Calvin Harris & Alesso",
        "Calvin Harris & Disciples",
        true
      )
    ).toBe(true);
  });
  test("Check if an artist contained in one '&' and one ',' separated lists of artists is a duplicate", () => {
    expect(
      isDuplicateArtist(
        "Calvin Harris & Disciples",
        "Calvin Harris, Dua Lipa",
        true
      )
    ).toBe(true);
  });
  test("Check if an artist contained in a list of 3 artists is a duplicate", () => {
    expect(
      isDuplicateArtist(
        "Ellie Goulding",
        "Ellie Goulding, Diplo & Swae Lee",
        true
      )
    ).toBe(true);
  });
  test("Check if an artist contained in two large lists is a duplicate", () => {
    expect(
      isDuplicateArtist(
        "Kanye West, Big Sean, Pusha T & 2 Chainz",
        "Kanye West, Chief Keef, Pusha T, Big Sean & Jadakiss",
        true
      )
    ).toBe(true);
  });
  test("Check if an artist contained in a list of two artists and a list of three artists is a duplicate", () => {
    expect(
      isDuplicateArtist("Lil Baby & Gunna", "Lil Baby, Gunna & Drake", true)
    ).toBe(true);
  });
  test("Potato Salad", () => {
    expect(
      isDuplicateArtist(
        "Tyler, the Creator",
        "Tyler, The Creator & A$AP Rocky",
        true
      )
    ).toBe(true);
  });
});

describe("Check if the isDuplicateArtist method successfully detects non duplicates", () => {
  test("Check if different artists with one matching the beginning of the other are not duplicates", () => {
    expect(isDuplicateArtist("America", "American Football", true)).toBe(false);
  });
  test("Check if different artists with with the same first name are not duplicates", () => {
    expect(isDuplicateArtist("Anthony Green", "Anthony Naples", true)).toBe(
      false
    );
  });
  test("Check if an artist with only first name is not a duplicate of another artist with same first name and a last name", () => {
    expect(isDuplicateArtist("Arthur", "Arthur Brown", true)).toBe(false);
  });
  test("Check if an artist with only first name is not a duplicate of another artist with same first name and a last name", () => {
    expect(isDuplicateArtist("Desire", "Desired", true)).toBe(false);
  });
});
