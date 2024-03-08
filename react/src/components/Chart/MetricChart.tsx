import { LineController, defaults } from "chart.js";
import numeral from "numeral";

class Metric extends LineController {
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
    let value = numeral(pt0).value() ? numeral(pt0).format("0,0.00") : pt0 + "";

    const ctx = this.chart.ctx;
    ctx.save();

    // Draw the text

    ctx.fillStyle = defaults.color as string;
    ctx.font = "600 44px " + defaults.font.family;
    ctx.fillText(value, 0, 75);
    let w = ctx.measureText(value).width;

    ctx.font = "16px " + defaults.font.family;
    ctx.fillText(meta.label || "", 10 + w, 75);

    ctx.restore();
  }
}

export default Metric;
