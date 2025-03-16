"use client";

import { useEffect, useState, useRef } from "react";
import { ValidationError } from "../api/validators/types";

export type UseGetDuplicatesProps<T> = {
  user: string;
  getNumEntities: (user: string) => Promise<number | ValidationError>;
  getEntities: (user: string, page: number) => Promise<T[] | ValidationError>;
};

export const useGetAllEntities = <T>({
  user,
  getNumEntities,
  getEntities,
}: UseGetDuplicatesProps<T>) => {
  const [numEntities, setNumEntities] = useState(-1);
  const [page, setPage] = useState(-1);
  const [numPages, setNumPages] = useState(-1);
  const [error, setError] = useState<string>();

  const entitiesRef = useRef<T[]>([]);

  useEffect(() => {
    const fetchNumEntities = async () => {
      const numEntities = await getNumEntities(user);
      if (typeof numEntities !== "number") {
        setError(numEntities.error);
        return;
      }

      setNumEntities(numEntities);
      setNumPages(Math.ceil(numEntities / 1000));

      entitiesRef.current = new Array(numEntities);

      setPage(1);
    };

    fetchNumEntities();
  }, [user, getNumEntities]);

  useEffect(() => {
    if (page < 1 || page > numPages || entitiesRef.current.length === 0) return;

    const fetchEntities = async () => {
      const fetchedEntities = await getEntities(user, page);
      if (!Array.isArray(fetchedEntities)) {
        setError(fetchedEntities.error);
        return;
      }

      const startIndex = (page - 1) * 1000;
      fetchedEntities.forEach((track, i) => {
        entitiesRef.current[startIndex + i] = track;
      });

      setPage((prevPage) => prevPage + 1);
    };

    fetchEntities();
  }, [user, page, numPages, getEntities]);

  return {
    numEntities,
    entities: entitiesRef.current,
    loadedPercentage: page > 0 ? (page - 1) / numPages : 0,
    error,
  };
};
