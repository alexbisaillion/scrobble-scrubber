import { EntityType } from "../types";
import { Button } from "./common";

type TopEntityFormProps = {
  user: string;
  setUser: (username: string) => void;
  entityType: EntityType;
  setEntityType: (entityType: EntityType) => void;
  setHasSubmittedForm: () => void;
};

export const TopEntityForm = ({
  user,
  setUser,
  entityType,
  setEntityType,
  setHasSubmittedForm,
}: TopEntityFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmittedForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 p-4">
        <input
          placeholder="Username"
          type="text"
          id="username"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          required
          className="mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <select
          id="entityType"
          value={entityType}
          onChange={(e) => setEntityType(e.target.value as EntityType)}
          className="mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="tracks">Tracks</option>
          <option value="albums">Albums</option>
          <option value="artists">Artists</option>
        </select>
        <div className="flex justify-center">
          <Button label="Submit" type="submit" fill="bg-blue-600" />
        </div>
      </div>
    </form>
  );
};
