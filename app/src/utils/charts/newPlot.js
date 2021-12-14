import canvasUtils from "./canvasUtils";

class Plot {
  constructor(config) {
    this.canvas = config.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = this.canvas.parentElement.clientWidth;
    this.canvas.height = 400;

    this.minX = config.minX;
    this.minY = config.minY;
    this.maxX = config.maxX;
    this.maxY = config.maxY;
    this.dots = config.dots;

    this.unitsPerTickX = config.unitsPerTickX;
    this.unitsPerTickY = config.unitsPerTickY;
    this.tickSize = 2;

    this.margin = 10;
    this.padding = 20;

    this.computeProps();
    this.CANVAS_UTILS = canvasUtils(this);
    this.drawXAxis();
    this.drawYAxis();
  }

  computeProps() {
    this.x = this.padding * 2;
    this.y = this.padding * 2;

    this.width = this.canvas.width - this.x * 2;
    this.height = this.canvas.height - this.y * 2;

    this.rangeX = this.maxX - this.minY;
    this.rangeY = this.maxY - this.minY;

    this.numXTicks = 20;
    this.numYTicks = 20;

    this.scaleX = this.width / this.rangeX;
    this.scaleY = this.height / this.rangeY;
  }

  add() {
    this.CANVAS_UTILS.drawTrajectory();
  }

  drawYAxis() {
    const from = { x: this.x, y: this.y };
    const to = { x: this.x, y: this.y + this.height };
    this.CANVAS_UTILS.drawLine({ from, to });

    this.splitYaxis();
    this.addYaxisLabels();
  }

  drawXAxis() {
    const from = { x: this.x, y: this.y + this.height };
    const to = { x: this.x + this.width, y: this.y + this.height };

    this.CANVAS_UTILS.drawLine({ ctx: this.ctx, from, to });

    this.splitXaxis();
    this.addXaxisLabels();
  }

  splitXaxis() {
    const coordinates = {
      x: (number) => (number * this.width) / this.numXTicks + this.x,
      y: () => this.y + this.height,
    };
    this.CANVAS_UTILS.drawTicks({
      totalTicks: this.numYTicks,
      coordinates,
      horizontalTick: this.tickSize,
    });
  }

  addXaxisLabels() {
    this.CANVAS_UTILS.resetStyles({ ctx: this.ctx });

    const coordinates = {
      x: (number) => ((number + 1) * this.width) / this.numXTicks + this.x,
      y: () => this.y + this.height + this.margin,
    };
    const label = (number) =>
      Math.round(((number + 1) * this.maxX) / this.numXTicks);

    this.CANVAS_UTILS.printLabels({
      coordinates,
      totalTicks: this.numXTicks,
      label,
    });
  }

  splitYaxis() {
    const coordinates = {
      x: () => this.x,
      y: (number) => (number * this.height) / this.numYTicks + this.y,
    };

    this.CANVAS_UTILS.drawTicks({
      totalTicks: this.numYTicks,
      coordinates,
      verticalTick: this.tickSize,
    });
  }

  addYaxisLabels() {
    this.CANVAS_UTILS.resetStyles({ textAlign: "right" });

    const coordinates = {
      x: () => this.x - this.margin,
      y: (number) => (number * this.height) / this.numYTicks + this.y,
    };
    const label = (number) =>
      Math.round(this.maxY - (number * this.maxY) / this.numYTicks);

    this.CANVAS_UTILS.printLabels({
      coordinates,
      totalTicks: this.numXTicks,
      label,
    });
  }

  transformContext() {
    this.ctx.translate(this.x, this.y + this.height);
    this.ctx.scale(1, -1);
  }
}

function init(settings) {
  var myLineChart = new Plot({
    canvasId: "canvas",
    minX: 0,
    minY: 0,
    maxX: settings.dots.length,
    maxY: 7,
    unitsPerTickX: 10,
    unitsPerTickY: 10,
    ...settings
  });

  myLineChart.add();
}

export default init;
