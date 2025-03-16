"use client";

import { useEffect } from "react";
import { getNumTracks, getTracks } from "../api";
import { useGetAllEntities } from "./useGetAllEntities";
import { getPartitionedDuplicates, isDuplicateTrack } from "../logic";

export const useGetDuplicateTracks = (user: string) => {
  const { entities, loadedPercentage, error } = useGetAllEntities({
    user,
    getNumEntities: getNumTracks,
    getEntities: getTracks,
  });

  useEffect(() => {
    if (loadedPercentage >= 100 && !error) {
      const duplicates = getPartitionedDuplicates({
        entities,
        isDuplicateEntity: isDuplicateTrack,
        useRules: true,
      });
      console.log(duplicates);
    }
  }, [loadedPercentage, entities, error]);
  return { entities, loadedPercentage };
};
