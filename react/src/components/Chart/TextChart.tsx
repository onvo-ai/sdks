import { LineController, defaults } from "chart.js";

class TextChart extends LineController {
  static id = "text";
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

    let subtitle = this.chart.options.plugins?.subtitle?.text;
    let align = this.chart.options.plugins?.subtitle?.align || "start";
    let cssAlign =
      align === "start"
        ? "onvo-text-left"
        : align === "end"
        ? "onvo-text-right"
        : "onvo-text-center";
    if (parent && subtitle) {
      let elems = parent.getElementsByClassName("onvo-separator");
      for (let i = 0; i < elems.length; i++) {
        elems[i].remove();
      }
      let div = document.createElement("div");
      div.className =
        "onvo-separator onvo-overflow-y-hidden onvo-bottom-0 onvo-prose onvo-prose-sm dark:onvo-prose-invert " +
        cssAlign;
      div.style.position = "absolute";
      div.style.left = canvas.left - 3 + "px";
      div.style.top = canvas.top + "px";
      div.style.height = canvas.height + "px";
      div.style.width = canvas.width + "px";
      div.style.maxWidth = canvas.width + "px";

      div.style.color = defaults.color as string;
      div.style.font = "14px " + defaults.font.family;

      div.innerHTML =
        typeof subtitle === "string" ? subtitle : subtitle.join("<br />");
      parent.appendChild(div);
    }
  }
}

export default TextChart;
