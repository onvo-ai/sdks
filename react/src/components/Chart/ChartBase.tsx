import { ErrorBoundary } from "react-error-boundary";
import { Text, Title } from "../../tremor/Text";
import { Button } from "../../tremor/Button";

import TableWidget from "./TableWidget";
import React, { useMemo, useRef, useState } from "react";

import "chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm";
import { Chart } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js";
import { WidgetSettings } from "@onvo-ai/js";
import { useTheme } from "../../layouts/Dashboard/useTheme";

import { MetricChart, MetricPlugin } from "./MetricChart";
import TextChart from "./TextChart";
import ImageChart from "./ImageChart";
import { DividerChart, DividerPlugin } from "./DividerChart";
import { FunnelController, TrapezoidElement, } from "chartjs-chart-funnel";
import ChartDataLabels from "chartjs-plugin-datalabels";
import zoomPlugin from "chartjs-plugin-zoom";
import { PolygonController, PolylineController, MarkerController, MapPlugin, MapController } from "@onvo-ai/chartjs-chart-map";
import { MatrixController, MatrixElement } from 'chartjs-chart-matrix';
import { WordCloudController, WordElement } from 'chartjs-chart-wordcloud';
import { SankeyController, Flow } from 'chartjs-chart-sankey';

import "chart.js/auto";

function transparentize(hexColor: string, opacity: number) {
  // Convert opacity to hex value
  let alphaHex = Math.round(opacity * 255).toString(16);
  if (alphaHex.length === 1) {
    alphaHex = "0" + alphaHex;
  }

  // Return the hex color with the alpha value
  return hexColor + alphaHex;
}

ChartJS.register(
  PolygonController, PolylineController, MarkerController, MapController,
  FunnelController,
  TrapezoidElement,
  MetricChart,
  MetricPlugin,
  TextChart,
  ImageChart,
  DividerPlugin,
  DividerChart,
  ChartDataLabels,
  zoomPlugin,
  WordCloudController,
  WordElement,
  SankeyController,
  Flow,
  MatrixController,
  MatrixElement
);

const ChartBase: React.FC<{
  json: any;
  title: string;
  settings?: WidgetSettings;
}> = ({ json, title }) => {
  const chartRef = useRef<any>();
  const [zoomed, setZoomed] = useState(false);
  const theme = useTheme();

  const resetZoom = () => {
    chartRef.current?.resetZoom();
    setZoomed(false);
  };

  let chartConfig = useMemo(() => {
    let output = Object.assign({}, json, {});
    let subtitle =
      output.options.plugins?.subtitle?.display !== false &&
      output.options.plugins?.subtitle?.text?.trim &&
      output.options.plugins?.subtitle?.text?.trim() !== "";

    output.options.plugins.title = {
      display: (title || output.options.plugins.title?.text || "").trim() === "" ? false : true,
      text: title || output.options.plugins.title?.text || "",
      align: output.options.plugins.title?.align || "start",
      position: output.options.plugins.title?.position || "top",
      fullSize: true,
      font: {
        size: output.type === "text" ? 24 : 18,
        weight: 600,
      },
      color: theme === "dark" ? "#ddd" : "#111",
      padding: output.options.plugins.title?.padding || {
        bottom: 5,
      },
    };

    if (subtitle) {
      output.options.plugins.subtitle = {
        display: output.options.plugins?.subtitle?.display || true,
        text: output.options.plugins.subtitle?.text || "",
        align: output.options.plugins.subtitle?.align || "start",
        position: output.options.plugins.subtitle?.position || "top",
        fullSize: true,
        font: {
          size: 12,
          weight: 400,
        },
        padding: output.options.plugins.subtitle?.padding || {
          bottom: 10,
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
            backgroundColor: "rgba(59, 130, 246, 0.2)",
            borderColor: "rgb(59, 130, 246)",
            borderWidth: 2,
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
    if (output.type === "matrix") {
      output.data.datasets = output.data.datasets.map((dataset: any, index: number) => {
        return {
          ...dataset,
          backgroundColor: (context: any) => {
            const value = context.dataset.data[context.dataIndex].v;
            const max = Math.max(...dataset.data.map((d: any) => d.v));
            const opacity = (value / max);
            var alpha = opacity === undefined ? 0.5 : (1 - opacity);
            return transparentize(dataset.baseColor || "#22c55e", alpha);
          },
          borderWidth: 2,
          borderColor: theme === "dark" ? "#0f172a" : "#ffffff",
          width: ({ chart }: { chart: any }) => (chart.chartArea || {}).width / chart.scales.x.ticks.length,
          height: ({ chart }: { chart: any }) => (chart.chartArea || {}).height / chart.scales.y.ticks.length
        };
      });
    }
    output.options.theme = theme;
    return output;
  }, [json, title, theme]);

  return (
    <ErrorBoundary
      fallbackRender={({ error }) => (
        <div className="onvo-chart-base-error-fallback onvo-flex onvo-h-full onvo-w-full onvo-flex-col onvo-items-center onvo-justify-center">
          <Title className="onvo-error-title">Error rendering chart</Title>
          <Text className="onvo-error-message">{error.message}</Text>
        </div>
      )}
    >
      {chartConfig ? (
        chartConfig.type === "table" ? (
          <TableWidget data={chartConfig} />
        ) : (
          <div
            className={
              "onvo-relative onvo-w-full " +
              (zoomed ? "onvo-h-[calc(100%-40px)]" : "onvo-h-full")
            }
          >
            <Chart ref={chartRef} plugins={chartConfig.type === "map" ? [MapPlugin] : []} key={theme} {...chartConfig} />
          </div>
        )
      ) : (
        <></>
      )}

      <div
        className={
          "onvo-overflow-y-hidden onvo-w-full onvo-mt-1 onvo-px-2 onvo-transition-all onvo-bg-gray-50 dark:onvo-bg-gray-800 onvo-rounded-md onvo-flex onvo-flex-row onvo-items-center onvo-justify-between " +
          (zoomed ? "onvo-h-10" : "onvo-h-0")
        }
      >
        <Text className="onvo-text-xs onvo-font-semibold">
          Hold{" "}
          <span className="onvo-rounded-[4px] onvo-px-1 onvo-py-0.5 onvo-border-solid onvo-border onvo-shadow-sm onvo-border-gray-200 onvo-bg-gray-100 dark:onvo-border-gray-600 dark:onvo-bg-gray-700 dark:onvo-text-gray-400">
            Shift
          </span>{" "}
          and drag to pan
        </Text>
        <Button
          className="!onvo-px-2 !onvo-py-0.5 onvo-text-gray-600 dark:onvo-text-gray-300"
          onClick={resetZoom}
        >
          Reset zoom
        </Button>
      </div>
    </ErrorBoundary>
  );
};

export default ChartBase;
