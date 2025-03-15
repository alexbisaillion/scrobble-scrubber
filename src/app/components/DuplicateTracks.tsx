"use client";

import { useGetDuplicateTracks } from "../hooks/useGetDuplicateTracks";

type DuplicateTracksProps = {
  user: string;
};

export const DuplicateTracks = ({ user }: DuplicateTracksProps) => {
  const { entities, loadedPercentage } = useGetDuplicateTracks(user);

  return (
    <>
      <span>Loaded: {loadedPercentage}</span>
      <span>Count: {entities.filter((track) => track !== null).length}</span>
    </>
  );
};
