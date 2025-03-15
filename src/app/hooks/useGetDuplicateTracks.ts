"use client";

import { useEffect } from "react";
import { getNumTracks, getTracks } from "../api";
import { useGetAllEntities } from "./useGetAllEntities";

export const useGetDuplicateTracks = (user: string) => {
  const { entities, loadedPercentage } = useGetAllEntities({
    user,
    getNumEntities: getNumTracks,
    getEntities: getTracks,
  });

  useEffect(() => {
    if (loadedPercentage >= 1) {
      console.log(entities);
    }
  }, [loadedPercentage, entities]);
  return { entities, loadedPercentage };
};
