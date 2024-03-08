import { ErrorBoundary } from "react-error-boundary";
import { Text, Title, Metric, Flex } from "@tremor/react";

import "chart.js/auto";
import { Chart } from "react-chartjs-2";

import TableWidget from "./TableWidget";
import numeral from "numeral";
import ChartDataLabels from "chartjs-plugin-datalabels";
import React from "react";

const ChartBase: React.FC<{ json: any; id: string; title: string }> = ({
  json,
  id,
  title,
}) => {
  let output = Object.assign({}, json, {});
  output.options.plugins.title = {
    display: true,
    text: title || output.options.plugins.title?.text || "",
    align: "start",
    fullSize: true,
    font: {
      size: 18,
      weight: 500,
      family: "Inter",
    },
  };

  return (
    <ErrorBoundary
      fallbackRender={({ error }) => (
        <div className="flex h-full w-full flex-col items-center justify-center ">
          <Title>Error rendering chart</Title>
          <Text>{error.message}</Text>
        </div>
      )}
    >
      {output ? (
        output.type === "metric" ? (
          <Flex
            justifyContent="start"
            alignItems="baseline"
            className="space-x-3 truncate"
          >
            <Metric>
              {numeral(output.data.datasets[0].data[0]).value()
                ? numeral(output.data.datasets[0].data[0]).format("0,0.00")
                : output.data.datasets[0].data[0]}
            </Metric>
            <Text>{output.data.datasets[0].label}</Text>
          </Flex>
        ) : output.type === "table" ? (
          <TableWidget data={output} />
        ) : (
          <Chart
            id={id}
            className="h-full w-full"
            plugins={output.type === "funnel" ? [ChartDataLabels] : []}
            {...output}
          />
        )
      ) : (
        <></>
      )}
    </ErrorBoundary>
  );
};

export default ChartBase;
