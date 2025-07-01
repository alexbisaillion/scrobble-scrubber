"use client";
import { useState } from "react";
import { Button } from "./common";

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
              This web app helps you clean up your Last.fm library by scanning
              for duplicate or keyword-matching tracks, albums, or artists.
              <br />
              <br />
              Duplicate records often appear when streaming services update
              track or album metadata, such as adding a feature or deluxe tag.
              They can also arise from using multiple streaming platforms with
              inconsistent metadata. <br />
              <br />
              Each duplicate found includes a direct link, allowing you to edit
              the scrobbles on the Last.fm website. Note that scrobble editing
              requires a Last.fm Pro subscription. You can also save your search
              results for future access, independent of this site.
              <br />
              <br />
              You can also search all fetched items for a specific keyword
              you&apos;d like to clean up, such as removing
              &apos;Remastered&apos; or &apos;Deluxe&apos; from your library.
              <br />
              <br />
              Developed by Alex Bisaillion.
              <br />
              <a
                href="https://www.alexbisaillion.com/"
                target="_blank"
                rel="noopener"
              >
                alexbisaillion.com
              </a>
              <br />
              <a
                href="https://github.com/alexbisaillion/scrobble-scrubber"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/alexbisaillion/scrobble-scrubber
              </a>
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
