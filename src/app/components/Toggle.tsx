import React from "react";

type ToggleProps = {
  isEnabled: boolean;
  onToggle: (value: boolean) => void;
  label: string;
};

export const Toggle: React.FC<ToggleProps> = ({
  isEnabled,
  onToggle,
  label,
}) => {
  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
      <label className="flex items-center gap-2 cursor-pointer">
        <div
          className={`relative w-12 h-7 rounded-full transition ${
            isEnabled ? "bg-blue-500" : "bg-gray-500"
          }`}
          onClick={() => onToggle(!isEnabled)}
        >
          <div
            className={`absolute top-1/2 transform -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
              isEnabled ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </div>
        <span className="text-sm font-medium text-white">{label}</span>
      </label>
    </div>
  );
};
