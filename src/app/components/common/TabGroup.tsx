import { JSX, useState } from "react";

type TabGroupProps = {
  tabs: { header: string; content: JSX.Element }[];
};

export const TabGroup = ({ tabs }: TabGroupProps) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className="flex flex-col items-center min-w-full">
      <div className="flex min-w-full">
        {tabs.map((_, index) => (
          <button
            key={index}
            className={`px-4 py-2 flex-1 cursor-pointer rounded-t-sm ${
              activeTab === index ? "bg-gray-800" : "bg-[#0a0a0a]  "
            }`}
            onClick={() => handleTabClick(index)}
          >
            {tabs[index].header}
          </button>
        ))}
      </div>
      <div className="w-full bg-gray-800 flex flex-col items-center gap-4">
        {tabs[activeTab].content}
      </div>
    </div>
  );
};
