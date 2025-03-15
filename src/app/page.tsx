"use client";

import { useState } from "react";
import { TopEntityForm } from "./components";
import { DuplicateTracks } from "./components/DuplicateTracks";

export default function Home() {
  const [username, setUsername] = useState<string>("");
  const [entityType, setEntityType] = useState<
    "tracks" | "albums" | "artists"
  >();

  const processForm = (
    username: string,
    entityType: "tracks" | "albums" | "artists"
  ) => {
    setUsername(username);
    setEntityType(entityType);
  };

  return (
    <>
      <TopEntityForm processForm={processForm} />
      {username && entityType === "tracks" && (
        <DuplicateTracks user={username} />
      )}
    </>
  );
}
