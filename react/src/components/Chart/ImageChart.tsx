import { LineController, defaults } from "chart.js";

function clipRoundedCanvas(
  ctx: CanvasRenderingContext2D,
  radius: number,
  width: number,
  height: number
) {
  let x = 0;
  let y = 0;
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  ctx.clip();
}
function scaleToFit(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  width: number,
  height: number
) {
  // get the scale
  var scale = Math.min(width / img.width, height / img.height);
  // get the top left position of the image
  var x = width / 2 - (img.width / 2) * scale;
  var y = height / 2 - (img.height / 2) * scale;
  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
}

function scaleToFill(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  width: number,
  height: number
) {
  // get the scale
  var scale = Math.max(width / img.width, height / img.height);
  // get the top left position of the image
  var x = width / 2 - (img.width / 2) * scale;
  var y = height / 2 - (img.height / 2) * scale;
  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
}

class ImageChart extends LineController {
  static id = "image";
  static overrides = {
    plugins: {
      image: {
        url: "",
        fill: "fit",
      },
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

  draw() {
    let canvas = this.chart.canvas;
    // @ts-ignore
    let url = this.chart.options.plugins.image.url;
    // @ts-ignore
    let fill = this.chart.options.plugins.image.fill;
    // draw image on canvas
    let ctx = canvas.getContext("2d");
    if (!ctx) return;
    let width = this.chart.width;
    let height = this.chart.height;
    let radius = 6;

    var img = new Image();
    img.src = url;
    img.onload = () => {
      clipRoundedCanvas(ctx, radius, width, height);
      if (fill === "fit") {
        scaleToFit(ctx, img, width, height);
      } else {
        scaleToFill(ctx, img, width, height);
      }
    };
  }
}

export default ImageChart;
