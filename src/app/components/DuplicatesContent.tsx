import { JSX } from "react";
import {
  getAlbums,
  getArtists,
  getNumAlbums,
  getNumArtists,
  getNumTracks,
  getTracks,
  ValidationError,
} from "../api";
import { Album, Artist, EntityType, Track } from "../types";
import { DuplicatesLifecycle } from "./DuplicatesLifecycle";
import { PartitionedDuplicatesResultsContent } from "./PartitionedDuplicatesResultsContent";
import {
  isDuplicateAlbum,
  isDuplicateArtist,
  isDuplicateTrack,
  sortEntities,
  getPartitionedEntities,
} from "../logic";
import { getAlbumLink, getArtistLink, getTrackLink } from "../utils";
import { DuplicateResultsContent } from "./DuplicatesResultsContent";
import { TabGroup } from "./common";
import { SearchResultsContent } from "./SearchResultsContent";

type EntityTypeMap = {
  tracks: Track;
  albums: Album;
  artists: Artist;
};

type DuplicatesContentProps<T extends EntityType> = {
  user: string;
  entityType: T;
  reset: () => void;
};

const entityMethods: {
  [K in EntityType]: {
    getNumEntities: (user: string) => Promise<number | ValidationError>;
    getEntities: (
      user: string,
      page: number
    ) => Promise<EntityTypeMap[K][] | ValidationError>;
    renderDuplicates: (
      entities: EntityTypeMap[K][],
      user: string
    ) => JSX.Element;
  };
} = {
  tracks: {
    getNumEntities: getNumTracks,
    getEntities: getTracks,
    renderDuplicates: (tracks, user) => (
      <TabGroup
        tabs={[
          {
            header: "Duplicates",
            content: (
              <PartitionedDuplicatesResultsContent
                key="duplicates"
                user={user}
                entities={tracks}
                isDuplicateEntity={(trackA, trackB, useRules) =>
                  isDuplicateTrack(trackA.name, trackB.name, useRules)
                }
                getEntityLink={getTrackLink}
                getEntityDisplayText={(track) => track.name}
                getEntityJsonRepresentation={(track) => ({
                  artist: track.artist,
                  name: track.name,
                  url: getTrackLink(track, user),
                })}
                getHeaders={() => [
                  "Track A Artist",
                  "Track A Name",
                  "Track A URL",
                  "Track B Artist",
                  "Track B Name",
                  "Track B URL",
                ]}
                sortEntities={(trackA, trackB) =>
                  sortEntities(trackA.name, trackB.name)
                }
                getPartitionedEntities={getPartitionedEntities}
              />
            ),
          },
          {
            header: "Search",
            content: (
              <SearchResultsContent
                user={user}
                entities={tracks}
                searchEntity={(track, searchTerm) =>
                  track.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  track.artist.toLowerCase().includes(searchTerm.toLowerCase())
                }
                getEntityDisplayText={({ artist, name }) =>
                  `${artist} - ${name}`
                }
                getEntityLink={getTrackLink}
                getEntityJsonRepresentation={(track) => ({
                  artist: track.artist,
                  name: track.name,
                  url: getTrackLink(track, user),
                })}
              />
            ),
          },
        ]}
      />
    ),
  },
  albums: {
    getNumEntities: getNumAlbums,
    getEntities: getAlbums,
    renderDuplicates: (albums, user) => (
      <TabGroup
        tabs={[
          {
            header: "Duplicates",
            content: (
              <PartitionedDuplicatesResultsContent
                user={user}
                entities={albums}
                isDuplicateEntity={(albumA, albumB, useRules) =>
                  isDuplicateAlbum(albumA.name, albumB.name, useRules)
                }
                getEntityLink={getAlbumLink}
                getEntityDisplayText={(album) => album.name}
                getEntityJsonRepresentation={(album) => ({
                  artist: album.artist,
                  name: album.name,
                  url: getAlbumLink(album, user),
                })}
                getHeaders={() => [
                  "Album A Artist",
                  "Album A Name",
                  "Album A URL",
                  "Album B Artist",
                  "Album B Name",
                  "Album B URL",
                ]}
                sortEntities={(albumA, albumB) =>
                  sortEntities(albumA.name, albumB.name)
                }
                getPartitionedEntities={getPartitionedEntities}
              />
            ),
          },
          {
            header: "Search",
            content: (
              <SearchResultsContent
                user={user}
                entities={albums}
                searchEntity={(album, searchTerm) =>
                  album.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  album.artist.toLowerCase().includes(searchTerm.toLowerCase())
                }
                getEntityDisplayText={({ artist, name }) =>
                  `${artist} - ${name}`
                }
                getEntityLink={getAlbumLink}
                getEntityJsonRepresentation={(album) => ({
                  artist: album.artist,
                  name: album.name,
                  url: getAlbumLink(album, user),
                })}
              />
            ),
          },
        ]}
      />
    ),
  },
  artists: {
    getNumEntities: getNumArtists,
    getEntities: getArtists,
    renderDuplicates: (artists, user) => (
      <TabGroup
        tabs={[
          {
            header: "Duplicates",
            content: (
              <DuplicateResultsContent
                user={user}
                entities={artists.map(({ name }) => name)}
                isDuplicateEntity={isDuplicateArtist}
                getEntityLink={getArtistLink}
                getEntityDisplayText={(artist) => artist}
                getEntityJsonRepresentation={(artist) => ({
                  name: artist,
                  url: getArtistLink(artist, user),
                })}
                getHeaders={() => [
                  "Artist A",
                  "Artist A URL",
                  "Artist B",
                  "Artist B URL",
                ]}
                sortEntities={sortEntities}
              />
            ),
          },
          {
            header: "Search",
            content: (
              <SearchResultsContent
                user={user}
                entities={artists.map(({ name }) => name)}
                searchEntity={(artist, searchTerm) =>
                  artist.toLowerCase().includes(searchTerm.toLowerCase())
                }
                getEntityDisplayText={(artist) => artist}
                getEntityLink={getArtistLink}
                getEntityJsonRepresentation={(artist) => ({
                  name: artist,
                  url: getArtistLink(artist, user),
                })}
              />
            ),
          },
        ]}
      />
    ),
  },
};

export const DuplicatesContent = <T extends EntityType>({
  user,
  entityType,
  reset,
}: DuplicatesContentProps<T>) => {
  const { getNumEntities, getEntities, renderDuplicates } =
    entityMethods[entityType];

  return (
    <DuplicatesLifecycle<EntityTypeMap[T]>
      entityType={entityType}
      user={user}
      reset={reset}
      getNumEntities={getNumEntities}
      getEntities={getEntities}
      renderDuplicates={renderDuplicates}
    />
  );
};
