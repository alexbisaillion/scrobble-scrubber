"use client";

import { useState } from "react";
import { DuplicatesContent, TopEntityForm } from "./components";

export default function Home() {
  const [user, setUser] = useState<string>("");
  const [entityType, setEntityType] = useState<"tracks" | "albums" | "artists">(
    "tracks"
  );
  const [hasSubmittedForm, setHasSubmittedForm] = useState(false);

  const content = hasSubmittedForm ? (
    <DuplicatesContent
      user={user}
      entityType={entityType}
      reset={() => setHasSubmittedForm(false)}
    />
  ) : (
    <TopEntityForm
      user={user}
      setUser={setUser}
      entityType={entityType}
      setEntityType={setEntityType}
      setHasSubmittedForm={() => setHasSubmittedForm(true)}
    />
  );

  return (
    <div className="flex flex-col p-4 items-center gap-4">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
        Split Scrobble Finder V2
      </h2>
      {content}
    </div>
  );
}
