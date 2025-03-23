type DuplicateTableHeaderProps = {
  header: string;
};

export const DuplicateTableHeader = ({ header }: DuplicateTableHeaderProps) => {
  return (
    <thead>
      <tr className="bg-gray-700 text-gray-200">
        <th colSpan={2} className="px-4 py-3 text-center text-lg font-semibold">
          {header}
        </th>
      </tr>
    </thead>
  );
};
