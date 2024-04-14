import { ErrorBoundary } from "react-error-boundary";
import { Text, Title } from "@tremor/react";

import TableWidget from "./TableWidget";
import React from "react";

import "chart.js/auto";
import "chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm";
import { Chart } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js";
import { FunnelController, TrapezoidElement } from "chartjs-chart-funnel";
import ChartDataLabels from "chartjs-plugin-datalabels";
import Metric from "./MetricChart";

ChartJS.register([FunnelController, TrapezoidElement, ChartDataLabels, Metric]);
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
    },
  };

  return (
    <ErrorBoundary
      fallbackRender={({ error }) => (
        <div className="onvo-chart-base-error-fallback flex h-full w-full flex-col items-center justify-center">
          <Title className="error-title">Error rendering chart</Title>
          <Text className="error-message">{error.message}</Text>
        </div>
      )}
    >
      {output ? (
        output.type === "table" ? (
          <TableWidget data={output} />
        ) : (
          <Chart id={id} className="h-full w-full" {...output} />
        )
      ) : (
        <></>
      )}
    </ErrorBoundary>
  );
};

export default ChartBase;
