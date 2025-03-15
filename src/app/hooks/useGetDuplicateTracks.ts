"use client";

import { getNumTracks, getTracks } from "../api";
import { useGetDuplicates } from "./useGetDuplicates";

export const useGetDuplicateTracks = (user: string) =>
  useGetDuplicates({
    user,
    getNumEntities: getNumTracks,
    getEntities: getTracks,
  });
