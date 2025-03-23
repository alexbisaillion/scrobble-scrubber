type DuplicateCellProps<T> = {
  entity: T;
  user: string;
  getEntityDisplayText: (entity: T) => string;
  getEntityLink: (entity: T, user: string) => string;
};

export const DuplicateCell = <T,>({
  entity,
  user,
  getEntityDisplayText,
  getEntityLink,
}: DuplicateCellProps<T>) => {
  return (
    <td className="px-4 py-2 w-1/2 border-t border-gray-600">
      <a
        className="hover:opacity-75"
        href={getEntityLink(entity, user)}
        target="_blank"
        rel="noopener noreferrer"
      >
        {getEntityDisplayText(entity)}
      </a>
    </td>
  );
};
