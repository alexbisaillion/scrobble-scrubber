import { useState } from "react";
import { Button } from "./common";

type SearchResultsContentProps<T> = {
  user: string;
  entities: T[];
  searchEntity: (entity: T, searchTerm: string) => boolean;
  getEntityDisplayText: (entity: T) => string;
  getEntityLink: (entity: T, user: string) => string;
  getEntityJsonRepresentation: (entity: T) => Record<string, string>;
};

export const SearchResultsContent = <T,>({
  user,
  entities,
  searchEntity,
  getEntityDisplayText,
  getEntityLink,
}: SearchResultsContentProps<T>) => {
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
  const [searchResults, setSearchResults] = useState<T[] | undefined>(
    undefined,
  );

  const onApplySearch = () => {
    if (!searchTerm) {
      return;
    }

    setSearchResults(
      entities.filter((entity) => searchEntity(entity, searchTerm)),
    );
  };

  const renderSearchResults = () => {
    if (!searchResults) {
      return null;
    }

    if (searchResults.length === 0) {
      return <div>No results found</div>;
    }

    return (
      <table className="w-full border-collapse border border-gray-600">
        <tbody>
          {searchResults.map((entity, index) => (
            <tr
              key={getEntityDisplayText(entity)}
              className={index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"}
            >
              <td className="px-4 py-2 border-t border-gray-600">
                <a
                  className="hover:opacity-75"
                  href={getEntityLink(entity, user)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {getEntityDisplayText(entity)}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="flex flex-col gap-4 p-4 justify-center items-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onApplySearch();
        }}
      >
        <div className="flex gap-4 items-center justify-center">
          <input
            placeholder='Search for keywords like "Remastered" or "Deluxe"'
            type="text"
            value={searchTerm || ""}
            onChange={(e) => setSearchTerm(e.target.value)}
            required
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white w-md"
          />
          <Button onClick={onApplySearch} label="Search" fill="bg-blue-600" />
        </div>
      </form>
      {renderSearchResults()}
    </div>
  );
};
