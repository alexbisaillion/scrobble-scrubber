import { DuplicateMatch } from "../types";
import { Button } from "./Button";

type SummaryCardProps<T> = {
  duplicates: DuplicateMatch<T>[];
  getEntityJsonRepresentation: (entity: T) => Record<string, string>;
  getHeaders: () => string[];
};

const downloadCSV = <T,>({
  duplicates,
  getEntityJsonRepresentation,
  getHeaders,
}: SummaryCardProps<T>) => {
  const csvRows: string[] = [];

  csvRows.push(getHeaders().join(","));

  for (const { entityA, entityB } of duplicates) {
    csvRows.push(
      [
        ...Object.values(getEntityJsonRepresentation(entityA)),
        ...Object.values(getEntityJsonRepresentation(entityB)),
      ].join(",")
    );
  }

  const csvContent = csvRows.join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "duplicates.csv";
  link.click();
};

const downloadJSON = <T,>({
  duplicates,
  getEntityJsonRepresentation,
}: SummaryCardProps<T>) => {
  const blob = new Blob(
    [
      JSON.stringify(
        duplicates.map(({ entityA, entityB }) => ({
          entityA: getEntityJsonRepresentation(entityA),
          entityB: getEntityJsonRepresentation(entityB),
        })),
        null,
        2
      ),
    ],
    {
      type: "application/json",
    }
  );
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "duplicates.json";
  link.click();
};

export const SummaryCard = <T,>(props: SummaryCardProps<T>) => {
  const { duplicates } = props;
  const handleDownloadCSV = () => {
    downloadCSV(props);
  };

  const handleDownloadJSON = () => {
    downloadJSON(props);
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-xl text-gray-200 font-semibold mb-4">Summary</h2>
      <div className="text-gray-400 mb-4">
        <p>
          <strong>{duplicates.length}</strong> duplicates found.
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
