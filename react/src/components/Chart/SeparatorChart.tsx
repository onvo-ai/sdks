import { LineController } from "chart.js";

class Separator extends LineController {
  static id = "separator";
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

  draw() {}
}

export default Separator;
