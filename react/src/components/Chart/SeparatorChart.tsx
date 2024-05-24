import { LineController, defaults } from "chart.js";

class Separator extends LineController {
  static id = "separator";
  static overrides = {
    plugins: {
      legend: {
        display: false,
      },
      subtitle: {
        text: [],
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
    let parent = this.chart.canvas.parentElement;
    let canvas = this.chart.chartArea;

    let config = this.chart.options.plugins?.subtitle?.text;
    if (parent && config) {
      let elems = parent.getElementsByClassName("onvo-separator");
      for (let i = 0; i < elems.length; i++) {
        elems[i].remove();
      }
      let div = document.createElement("div");
      div.className = "onvo-separator";
      div.style.position = "absolute";
      div.style.left = canvas.left - 3 + "px";
      div.style.top = canvas.top + "px";
      div.style.height = canvas.height + "px";
      div.style.width = canvas.width + "px";

      div.style.color = defaults.color as string;
      div.style.font = "14px " + defaults.font.family;

      div.innerHTML =
        typeof config === "string" ? config : config.join("<br />");
      parent.appendChild(div);
    }
  }
}

export default Separator;
