"use client";

import { useEffect, useState, useRef } from "react";
import { getNumTracks, getTracks } from "../api";

export const useGetDuplicateTracks = (user: string) => {
  const [numTracks, setNumTracks] = useState(-1);
  const [page, setPage] = useState(-1);
  const [numPages, setNumPages] = useState(-1);

  const tracksRef = useRef<{ name: string; artist: string }[]>([]); // useRef to store tracks

  useEffect(() => {
    const fetchNumTracks = async () => {
      const numTracks = await getNumTracks(user);
      if (typeof numTracks !== "number") return;

      setNumTracks(numTracks);
      setNumPages(Math.ceil(numTracks / 1000));

      tracksRef.current = new Array(numTracks);

      setPage(1);
    };

    fetchNumTracks();
  }, [user]);

  useEffect(() => {
    if (page < 1 || page > numPages || tracksRef.current.length === 0) return;

    const fetchTracks = async () => {
      const fetchedTracks = await getTracks(user, page);
      if (!Array.isArray(fetchedTracks)) return;

      const startIndex = (page - 1) * 1000;
      fetchedTracks.forEach((track, i) => {
        tracksRef.current[startIndex + i] = track;
      });

      setPage((prevPage) => prevPage + 1);
    };

    fetchTracks();
  }, [user, page, numPages]);

  return { numTracks, tracks: tracksRef.current };
};
