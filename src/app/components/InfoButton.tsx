"use client";
import { useState } from "react";
import { Button } from "./Button";

export const InfoButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        label="About"
        fill="bg-white/10"
        onClick={() => setIsOpen(true)}
      />
      {isOpen && (
        <div className="fixed inset-0 bg-black/70  flex justify-center items-center z-50">
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">About</h2>
            <p className="text-sm mb-6">
              This web app can help you find duplicate records in your Last.fm
              library.
              <br />
              <br />
              Duplicate records often arise from variations in metadata between
              different streaming services, or updates to the tags of already
              existing songs, such as adding a feature tag.
              <br />
              <br />
              This tool will go through your Last.fm library, searching for
              duplicate tracks, albums, or artists. Direct links are provided to
              each duplicate that the algorithm finds, so you can edit the
              scrobbles accordingly on the Last.fm website (of course, you need
              to have Last.fm Pro to do so).
              <br />
              <br />
              You can also save the results of your search in either CSV or JSON
              format.
            </p>
            <div className="flex justify-end">
              <Button
                onClick={() => setIsOpen(false)}
                label="Close"
                fill="bg-blue-600"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
