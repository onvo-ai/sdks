import { LineController, defaults } from "chart.js";

export class DividerChart extends LineController {
  static id = "divider";
  static overrides = {
    plugins: {
      legend: {
        display: false,
      },
      subtitle: {
        display: false,
      },
      title: {
        display: false,
        text: "",
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

  draw() {}
}

export const DividerPlugin = {
  id: "divider",
  beforeDraw: (chart: any, args: any, options: any) => {
    const { ctx } = chart;
    if (!options.display) return;

    ctx.save();
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = defaults.borderColor;
    ctx.fillRect(0, chart.height / 2, chart.width, 1);
    ctx.restore();
  },
};
