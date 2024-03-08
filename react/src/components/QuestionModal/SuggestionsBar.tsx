import { SparklesIcon } from "@heroicons/react/24/solid";
import { Text } from "@tremor/react";
import React from "react";

const SuggestionsBar: React.FC<{ onSelect: (str: string) => void }> = ({
  onSelect,
}) => {
  const suggestions = [
    {
      name: "Change chart type",
      value: "Change the chart type to be …",
    },
    {
      name: "Show data labels",
      value: "Show data labels on the chart",
    },
    {
      name: "Edit chart colors",
      value: "Change the chart colors to be shades of …",
    },
    {
      name: "Add trend line",
      value: "Add a trend line to show the trend of the data",
    },
  ];

  return (
    <div className="w-full flex flex-row gap-2 my-2 overflow-y-auto max-w-2xl mx-auto">
      {suggestions.map((a) => (
        <div
          key={a.name}
          className="flex flex-shrink-0 flex-row items-center gap-1 bg-blue-50 dark:bg-blue-950 border border-blue-500 rounded-full py-1 px-2 hover:bg-blue-100 dark:hover:bg-blue-900 cursor-pointer"
          onClick={() => onSelect(a.value)}
        >
          <SparklesIcon className="h-4 w-4 text-blue-500" />
          <Text className="text-blue-500 dark:text-blue-500 font-medium">
            {a.name}
          </Text>
        </div>
      ))}
    </div>
  );
};

export default SuggestionsBar;
