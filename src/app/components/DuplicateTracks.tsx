"use client";

import { useGetDuplicateTracks } from "../hooks/useGetDuplicateTracks";

type DuplicateTracksProps = {
  user: string;
};

export const DuplicateTracks = ({ user }: DuplicateTracksProps) => {
  const { entities, numEntities } = useGetDuplicateTracks(user);

  return (
    <>
      <span>Total: {numEntities}</span>
      <span>Count: {entities.filter((track) => track !== null).length}</span>
    </>
  );
};
