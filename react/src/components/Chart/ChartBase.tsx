import { ErrorBoundary } from "react-error-boundary";
import { Badge, Button, Text, Title } from "@tremor/react";

import TableWidget from "./TableWidget";
import React, { useMemo, useRef, useState } from "react";

import "chart.js/auto";
import "chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm";
import { Chart, getElementAtEvent } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js";
import { FunnelController, TrapezoidElement } from "chartjs-chart-funnel";
import ChartDataLabels from "chartjs-plugin-datalabels";
import Metric from "./MetricChart";
import Separator from "./SeparatorChart";
import zoomPlugin from "chartjs-plugin-zoom";

ChartJS.register([
  FunnelController,
  TrapezoidElement,
  ChartDataLabels,
  Metric,
  Separator,
  zoomPlugin,
]);
const ChartBase: React.FC<{ json: any; id: string; title: string }> = ({
  json,
  id,
  title,
}) => {
  const chartRef = useRef<any>();
  const [zoomed, setZoomed] = useState(false);

  const resetZoom = () => {
    chartRef.current?.resetZoom();
    setZoomed(false);
  };

  let chartConfig = useMemo(() => {
    let output = Object.assign({}, json, {});
    output.options.plugins.title = {
      display: true,
      text: title || output.options.plugins.title?.text || "",
      align: "start",
      fullSize: true,
      font: {
        size: output.type === "separator" ? 24 : 18,
        weight: output.type === "separator" ? 600 : 500,
      },
      padding: {
        top: 5,
        bottom: 2,
      },
    };

    if (
      output.options.plugins.subtitle &&
      output.options.plugins.subtitle.display !== false
    ) {
      output.options.plugins.subtitle = {
        display: true,
        text: output.options.plugins.subtitle?.text || "",
        align: output.options.plugins.subtitle.align || "start",
        fullSize: true,
        font: {
          family: "Inter",
          size: 14,
          weight: 400,
        },
        padding: {
          top: 0,
          bottom: 15,
        },
      };
    }

    if (["line", "bar", "scatter"].indexOf(output.type) >= 0) {
      output.options.plugins.zoom = {
        pan: {
          enabled: true,
          mode: output.type === "scatter" ? "xy" : "x",
          modifierKey: "shift",
        },
        zoom: {
          drag: {
            enabled: true,
          },

          pinch: {
            enabled: true,
          },
          mode: output.type === "scatter" ? "xy" : "x",
          onZoom: () => {
            setZoomed(true);
          },
        },
      };
    }
    return output;
  }, [json, title]);

  return (
    <ErrorBoundary
      fallbackRender={({ error }) => (
        <div className="onvo-chart-base-error-fallback flex h-full w-full flex-col items-center justify-center">
          <Title className="error-title">Error rendering chart</Title>
          <Text className="error-message">{error.message}</Text>
        </div>
      )}
    >
      {chartConfig ? (
        chartConfig.type === "table" ? (
          <TableWidget data={chartConfig} />
        ) : (
          <div
            className={"w-full " + (zoomed ? "h-[calc(100%-40px)]" : "h-full")}
          >
            <Chart ref={chartRef} id={id} {...chartConfig} />
          </div>
        )
      ) : (
        <></>
      )}
      <div
        className={
          "overflow-y-hidden w-full mt-1 px-2 transition-all bg-gray-50 dark:bg-gray-800 rounded-md flex flex-row items-center justify-between " +
          (zoomed ? "h-10" : "h-0")
        }
      >
        <Text className="text-xs font-semibold">
          Hold{" "}
          <span className="rounded-[4px] px-1 py-0.5 border shadow-sm border-gray-200 bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400">
            Shift
          </span>{" "}
          and drag to pan
        </Text>
        <Button
          size="xs"
          className="px-2 py-0.5 rounded-[4px] dark:rounded-[4px] text-gray-600 dark:text-gray-300"
          onClick={resetZoom}
          color="gray"
        >
          Reset zoom
        </Button>
      </div>
    </ErrorBoundary>
  );
};

export default ChartBase;
