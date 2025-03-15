"use client";

import { useGetDuplicateTracks } from "../hooks/useGetDuplicateTracks";

type DuplicateTracksProps = {
  user: string;
};

export const DuplicateTracks = ({ user }: DuplicateTracksProps) => {
  const { numTracks, tracks } = useGetDuplicateTracks(user);

  console.log(tracks);

  return (
    <>
      <span>Total: {numTracks}</span>
      <span>Count: {tracks.filter((track) => track !== null).length}</span>
    </>
  );
};
