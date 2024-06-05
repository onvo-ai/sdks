import { SparklesIcon } from "@heroicons/react/24/solid";
import { Text } from "../../tremor/Text";
import React from "react";

export const SuggestionsBar: React.FC<{ onSelect: (str: string) => void }> = ({
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
    <div className="onvo-w-full onvo-flex onvo-flex-row onvo-gap-2 onvo-my-2 onvo-overflow-y-auto onvo-max-w-2xl onvo-mx-auto">
      {suggestions.map((a) => (
        <div
          key={a.name}
          className="onvo-flex onvo-flex-shrink-0 onvo-flex-row onvo-items-center onvo-gap-1 onvo-bg-blue-50 dark:onvo-bg-blue-950 onvo-border onvo-border-blue-500 onvo-rounded-full onvo-py-1 onvo-px-2 hover:onvo-bg-blue-100 dark:hover:onvo-bg-blue-900 onvo-cursor-pointer"
          onClick={() => onSelect(a.value)}
        >
          <SparklesIcon className="onvo-h-4 onvo-w-4 onvo-text-blue-500" />
          <Text className="onvo-text-blue-500 dark:onvo-text-blue-500 onvo-font-medium">
            {a.name}
          </Text>
        </div>
      ))}
    </div>
  );
};
