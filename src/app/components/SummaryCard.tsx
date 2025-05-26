import { DuplicateMatch } from "../types";
import { Button } from "./common";

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
  const escapeCSVValue = (value: string): string => {
    const needsEscaping =
      value.includes(",") || value.includes('"') || value.includes("\n");
    if (needsEscaping) {
      return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
  };

  const csvRows: string[] = [];

  csvRows.push(getHeaders().map(escapeCSVValue).join(","));

  for (const { entityA, entityB } of duplicates) {
    const values = [
      ...Object.values(getEntityJsonRepresentation(entityA)),
      ...Object.values(getEntityJsonRepresentation(entityB)),
    ].map(escapeCSVValue);

    csvRows.push(values.join(","));
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
    <>
      <div className="text-gray-400">
        <p>
          <strong>{duplicates.length}</strong> duplicates found.
        </p>
      </div>
      <div className="flex gap-4">
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
    </>
  );
};
