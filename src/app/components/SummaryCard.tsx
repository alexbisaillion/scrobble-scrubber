import { Button } from "./Button";

type Duplicates =
  | Map<
      string,
      {
        entity1: string;
        entity2: string;
      }[]
    >
  | {
      entity1: string;
      entity2: string;
    }[];

type SummaryCardProps = {
  duplicates: Duplicates;
};

const downloadCSV = (duplicates: Duplicates) => {
  const csvRows = [];

  const headers =
    duplicates instanceof Map
      ? ["Artist", "Match1", "Match2"]
      : ["Match1", "Match2"];
  csvRows.push(headers.join(","));

  if (duplicates instanceof Map) {
    for (const [artist, matches] of duplicates) {
      for (const match of matches) {
        csvRows.push([artist, match.entity1, match.entity2].join(","));
      }
    }
  } else {
    for (const row of duplicates) {
      csvRows.push([row.entity1, row.entity2].join(","));
    }
  }

  const csvContent = csvRows.join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "duplicates.csv";
  link.click();
};

const downloadJSON = (duplicates: Duplicates) => {
  const jsonObj =
    duplicates instanceof Map
      ? Object.fromEntries(
          [...duplicates].map(([key, value]) => [
            key,
            value.map(({ entity1, entity2 }) => ({
              match1: entity1,
              match2: entity2,
            })),
          ])
        )
      : duplicates.map(({ entity1, entity2 }) => ({
          match1: entity1,
          match2: entity2,
        }));

  const blob = new Blob([JSON.stringify(jsonObj, null, 2)], {
    type: "application/json",
  });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "duplicates.json";
  link.click();
};

export const SummaryCard = ({ duplicates }: SummaryCardProps) => {
  const handleDownloadCSV = () => {
    downloadCSV(duplicates);
  };

  const handleDownloadJSON = () => {
    downloadJSON(duplicates);
  };

  const numDuplicates =
    duplicates instanceof Map
      ? [...duplicates.values()].flat().length
      : duplicates.length;

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-xl text-gray-200 font-semibold mb-4">Summary</h2>
      <div className="text-gray-400 mb-4">
        <p>
          <strong>{numDuplicates}</strong> duplicates found.
        </p>
      </div>
      <div className="flex space-x-4">
        <Button
          onClick={handleDownloadCSV}
          label="Download as CSV"
          fill="bg-green-600"
        />
        <Button
          onClick={handleDownloadJSON}
          label="Download as JSON"
          fill="bg-blue-600"
        />
      </div>
    </div>
  );
};
