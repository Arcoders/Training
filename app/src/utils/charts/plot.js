class SimpleChartPlot {
  constructor(canvas, xAxis, yAxis) {
    this.canvas = canvas;
    this.xAxis = xAxis;
    this.yAxis = yAxis;
    this.sections = yAxis.length;
    this.max = 10;
    this.min = 0;
    this.steps = 5;
    this.columnSize = 50;
    this.rowSize = 50;
    this.margin = 20;
    this.ctx = canvas.getContext("2d");
    this.canvas.width = this.canvas.parentElement.clientWidth;
    this.formatPrices();
  }

  setScale() {
    this.yScale =
      (this.canvas.height - this.columnSize - this.margin) /
      (this.max - this.min);
    this.xScale = (this.canvas.width - this.rowSize) / this.sections;
  }

  beginPath() {
    this.ctx.beginPath();
    this.ctx.lineWidth = 0.7;
  }

  onResize() {
    window.addEventListener("resize", () => {
      this.canvas.width = this.canvas.parentElement.clientWidth;
      this.draw();
    });
  }

  closePahtAndTranslate() {
    this.ctx.stroke();
    this.ctx.translate(
      this.rowSize,
      this.canvas.height + this.min * this.yScale
    );
    this.ctx.scale(1, -1 * this.yScale);
  }

  drawHorizontalLines() {
    var count = 0;
    for (
      let scale = this.max;
      scale >= this.min;
      scale = scale - this.steps
    ) {
      var y = this.columnSize + this.yScale * count * this.steps;
      const text = Number(scale / 10).toFixed(2);
      this.ctx.fillText(text, this.margin, y);
      this.ctx.moveTo(this.rowSize, y);
      this.ctx.lineTo(this.canvas.width, y);
      count++;
    }
  }

  drawVerticalLines() {
    for (let i = 2; i <= this.sections; i++) {
      var x = i * this.xScale;
      const text = this.xAxis[i] ? this.xAxis[i].slice(5) : this.xAxis[i] || "";

        if (i % 2 == 0) {
            this.ctx.fillText(text.replace('-', '/'), x, this.columnSize);
        }

      this.ctx.moveTo(x, this.columnSize);
      this.ctx.lineTo(x, this.canvas.height - this.margin);
    }
  }

  formatPrices() {
    this.yAxis = this.yAxis.map((current) => {
      const [price] = current.map((current) => current.total_price);
      if (price) {
        return price * 10;
      }
      return undefined;
    }).filter(Boolean);

    this.max = Math.max.apply(null, this.yAxis) + 30;
    this.steps = this.max / 5

    this.sections = this.yAxis.length;
  }

  setDefaultStyles() {
    this.ctx.fillStyle = "#273043";
    this.ctx.font = "14px Arial";
    this.ctx.strokeStyle = "#f1f1f1";
  }

  drawLines() {
    this.beginPath();
    this.ctx.strokeStyle = "#55868c";
    this.ctx.moveTo(0, this.yAxis[0]);

    for (let i = 1; i < this.sections; i++) {
      this.ctx.lineTo(i * this.xScale, this.yAxis[i]);
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
