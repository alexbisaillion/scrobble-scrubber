import { Button } from "./common";

type SummaryCardProps<T> = {
  entities: T[][];
  getEntityJsonRepresentation: (entity: T) => Record<string, string>;
  getHeaders: () => string[];
};

const downloadCSV = <T,>({
  entities,
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

  for (const entityList of entities) {
    const values = entityList
      .map((entity) => Object.values(getEntityJsonRepresentation(entity)))
      .flat()
      .map(escapeCSVValue);

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
  entities,
  getEntityJsonRepresentation,
}: SummaryCardProps<T>) => {
  const blob = new Blob(
    [
      JSON.stringify(
        entities.map((entityList) =>
          entityList.map((entity) => getEntityJsonRepresentation(entity)),
        ),
        null,
        2,
      ),
    ],
    {
      type: "application/json",
    },
  );
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "duplicates.json";
  link.click();
};

export const SummaryCard = <T,>(props: SummaryCardProps<T>) => {
  const { entities } = props;
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
          <strong>{entities.length}</strong> results found.
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
