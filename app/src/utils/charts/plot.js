
import { formateDate } from "../commons/formatDate";

class SimpleChartPlot {
  constructor(canvas, config) {
    this.canvas = canvas;
    this.config = { ...config };
    this.ctx = canvas.getContext("2d");
    this.priceMargin = config.priceMargin;
    this.canvas.width = canvas.parentElement.clientWidth;
    this.formatPrices();
  }

  setScale() {
    this.yScale =
      (this.canvas.height - this.config.columnSize - this.config.margin) /
      (this.config.max - this.config.min);
    this.config.xScale =
      (this.canvas.width - this.config.rowSize) / this.sections;
  }

  beginPath() {
    this.ctx.beginPath();
    this.ctx.lineWidth = 0.7;
  }

  init() {
    this.draw();
    window.addEventListener("resize", () => {
      this.canvas.width = this.canvas.parentElement.clientWidth;
      this.draw();
    });
  }

  closePahtAndTranslate() {
    this.ctx.stroke();
    this.ctx.translate(
      this.config.rowSize,
      this.canvas.height + this.config.min * this.yScale
    );
    this.ctx.scale(1, -1 * this.yScale);
  }

  drawHorizontalLines() {
    var lines = 0;
    for (
      let scale = this.config.max;
      scale >= this.config.min;
      scale = scale - this.steps
    ) {
      var y = this.config.columnSize + this.yScale * lines * this.steps;
      const text = Number(scale / 10).toFixed(2);

      this.ctx.fillText(text, this.config.margin, y);
      this.ctx.moveTo(this.config.rowSize, y);
      this.ctx.lineTo(this.canvas.width, y);

      lines++;
    }
  }

  drawVerticalLines() {
    for (let i = 2; i <= this.sections; i++) {
      var x = i * this.config.xScale;

      const date = formateDate(this.config.xAxis[i]);
      if (this.config.xAxis.length <= 30) {
        this.config.skip = 1;
      }

      if (i % this.config.skip == 0) {
        this.ctx.fillText(date, x, this.config.columnSize - this.config.margin);
      }

      this.ctx.moveTo(x, this.config.columnSize);
      this.ctx.lineTo(x, this.canvas.height - this.config.margin);
    }
  }

  formatPrices() {
    this.config.yAxis = this.config.yAxis;
    this.config.max =
      Math.max.apply(null, this.config.yAxis) + this.priceMargin;
    this.steps = this.config.max / 5;
    this.sections = this.config.yAxis.length;
  }

  setDefaultStyles() {
    this.ctx.fillStyle = "#273043";
    this.ctx.font = "14px Arial";
    this.ctx.strokeStyle = "#f1f1f1";
  }

  drawLines() {
    this.beginPath();
    this.ctx.strokeStyle = "#55868c";
    this.ctx.moveTo(0, this.config.yAxis[0]);

    for (let i = 1; i < this.sections; i++) {
      this.ctx.lineTo(i * this.config.xScale, this.config.yAxis[i]);
    }
    this.ctx.stroke();
  }

  drawGrid() {
    this.beginPath();
    this.drawVerticalLines();
    this.drawHorizontalLines();
    this.closePahtAndTranslate();
  }

  draw() {
    this.setDefaultStyles();
    this.setScale();
    this.drawGrid();
    this.drawLines();
  }
}

export default SimpleChartPlot;
