import { LineController, defaults } from "chart.js";
import numeral from "numeral";

export class MetricChart extends LineController {
  static id = "metric";
  static overrides = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
  };

  draw() {
    const meta = this.getDataset();
    const pt0 = meta.data[0];
    const ctx = this.chart.ctx;
    const height = this.chart.chartArea.height;
    const width = this.chart.chartArea.width;

    // @ts-ignore
    const label = meta.label || "";
    let value = numeral(pt0).value()
      ? numeral(pt0).format("0,0.[00]")
      : pt0 + "";

  }
}

const drawChart = (ctx: CanvasRenderingContext2D, value: string, label: string, options: {
  left: number,
  top: number,
  height: number,
  width: number,
  align: "start" | "end" | "center",
  labelPosition: "vertical" | "horizontal",
  font?: {
    weight: string,
    size: number,
  }
}) => {

  ctx.clearRect(0, 0, options.width, options.height);
  ctx.save();

  // Draw the text
  ctx.fillStyle = defaults.color as string;
  let largest = 12;

  ctx.font = "16px " + defaults.font.family;
  const labelMetrics = ctx.measureText(label + "");
  let labelWidth = labelMetrics.width;
  let labelHeight = labelMetrics.actualBoundingBoxAscent + labelMetrics.actualBoundingBoxDescent;
  let labelVerticalOffset = 0;
  let labelHorizontalOffset = 0;

  let valueWidth = 0;
  let valueHeight = 0;

  let valueVerticalOffset = 0;
  let valueHorizontalOffset = 0;

  if (options.font?.size) {
    largest = options.font.size;
    ctx.font = `${options.font?.weight || 600} ${largest}px ${defaults.font.family}`;
    const metrics = ctx.measureText(value + "");
    valueWidth = metrics.width;
    valueHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
  } else {
    while (valueWidth < options.width * 0.8 && (valueHeight + 6) < options.height * 0.8) {
      largest += 1;
      ctx.font = `${options.font?.weight || 600} ${largest}px ${defaults.font.family}`;
      const metrics = ctx.measureText(value + "");
      valueWidth = metrics.width;
      valueHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    };
  }


  ctx.textBaseline = "alphabetic";

  if (options.labelPosition === "horizontal") {
    valueVerticalOffset = options.top + options.height;
    labelVerticalOffset = options.top + options.height;
    if (options.align === "start") {
      ctx.textAlign = "left";
      valueHorizontalOffset = 0;
      labelHorizontalOffset = valueWidth + 6;
    } else if (options.align === "center") {
      ctx.textAlign = "start";
      const totalWidth = valueWidth + labelWidth + 6;
      valueHorizontalOffset = options.left + (options.width / 2) - (totalWidth / 2);
      labelHorizontalOffset = options.left + (options.width / 2) + (labelWidth / 2)
    } else if (options.align === "end") {
      ctx.textAlign = "right";
      valueHorizontalOffset = options.left + options.width - labelWidth - 6;
      labelHorizontalOffset = options.left + options.width;
    }
  } else if (options.labelPosition === "vertical") {
    valueVerticalOffset = options.top + options.height - 18;
    labelVerticalOffset = options.top + options.height;
    if (options.align === "start") {
      ctx.textAlign = "left";
      valueHorizontalOffset = 0;
      labelHorizontalOffset = 0;
    } else if (options.align === "center") {
      ctx.textAlign = "center";
      valueHorizontalOffset = options.left + (options.width / 2);
      labelHorizontalOffset = options.left + (options.width / 2);
    } else if (options.align === "end") {
      ctx.textAlign = "right";
      valueHorizontalOffset = options.left + options.width;
      labelHorizontalOffset = options.left + options.width;
    }
  }



  ctx.fillText(value, valueHorizontalOffset, valueVerticalOffset, options.width);

  ctx.font = "16px " + defaults.font.family;
  ctx.fillText(label, labelHorizontalOffset, labelVerticalOffset, options.width);

  ctx.restore();
}

export const MetricPlugin = {
  id: "metric",
  beforeDraw: (chart: any, args: any, options: any) => {
    const { ctx } = chart;
    if (chart.config.type !== "metric") return;

    const dataset = chart.data.datasets[0];

    drawChart(ctx, dataset.data[0], dataset.label, {
      left: chart.chartArea.left,
      top: chart.chartArea.top,
      height: chart.chartArea.height,
      width: chart.chartArea.width,

      align: options.align || "start",
      labelPosition: options.labelPosition || "horizontal",
      font: options.font || undefined
    });
  },
};

export default MetricChart;
