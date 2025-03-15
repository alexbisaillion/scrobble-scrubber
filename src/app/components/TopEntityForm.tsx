"use client";

import { useState } from "react";

type TopEntityFormProps = {
  processForm: (
    username: string,
    entityType: "tracks" | "albums" | "artists"
  ) => void;
};

export const TopEntityForm = ({ processForm }: TopEntityFormProps) => {
  const [username, setUsername] = useState<string>("");
  const [entityType, setEntityType] = useState<"tracks" | "albums" | "artists">(
    "tracks"
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    processForm(username, entityType);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="flex flex-col gap-4 p-4">
        <h2 className="text-2xl font-semibold text-center text-gray-900 dark:text-white">
          Split Scrobble Finder V2
        </h2>
        <input
          placeholder="Username"
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <select
          id="entityType"
          value={entityType}
          onChange={(e) =>
            setEntityType(e.target.value as "tracks" | "albums" | "artists")
          }
          className="mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="tracks">Tracks</option>
          <option value="albums">Albums</option>
          <option value="artists">Artists</option>
        </select>
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 cursor-pointer text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};
