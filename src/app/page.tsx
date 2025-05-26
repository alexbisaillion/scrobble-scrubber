"use client";

import { useState } from "react";
import {
  Button,
  DuplicatesContent,
  InfoButton,
  TopEntityForm,
} from "./components";
import { EntityType } from "./types";

export default function Home() {
  const [user, setUser] = useState<string>("");
  const [entityType, setEntityType] = useState<EntityType>("tracks");
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
    <div className="flex flex-col items-center w-full">
      <div className="flex justify-between w-full p-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Scrobble Scrubber
        </h2>
        <div className="flex items-center gap-4">
          <Button
            label="Powered by last.fm"
            fill="bg-white/10"
            onClick={() =>
              window.open(
                "https://www.last.fm",
                "_blank",
                "noopener,noreferrer"
              )
            }
          />
          <InfoButton />
        </div>
      </div>
      <div className="flex flex-col p-4 items-center gap-4 max-w-5xl min-w-5xl">
        {content}
      </div>
    </div>
  );
}
