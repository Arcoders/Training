class SimpleChartPlot {
  constructor(canvas, xAxis, yAxis) {
    this.canvas = canvas;
    this.xAxis = xAxis;
    this.yAxis = yAxis;
    this.sections = yAxis.length;
    this.Val_max = 100;
    this.Val_min = 0;
    this.stepSize = 5;
    this.columnSize = 50;
    this.rowSize = 50;
    this.margin = 20;
    this.context = canvas.getContext("2d");
    this.canvas.width = this.canvas.parentElement.clientWidth;
    this.formatPrices();
  }

  setScale() {
    this.yScale =
      (this.canvas.height - this.columnSize - this.margin) /
      (this.Val_max - this.Val_min);
    this.xScale = (this.canvas.width - this.rowSize) / this.sections;
  }

  beginPath() {
    this.context.beginPath();
  }

  onResize() {
    window.addEventListener("resize", () => {
      this.canvas.width = this.canvas.parentElement.clientWidth;
      this.draw();
    });
  }

  closePahtAndTranslate() {
    this.context.stroke();
    this.context.translate(
      this.rowSize,
      this.canvas.height + this.Val_min * this.yScale
    );
    this.context.scale(1, -1 * this.yScale);
  }

  drawHorizontalLines() {
    var count = 0;
    for (
      let scale = this.Val_max;
      scale >= this.Val_min;
      scale = scale - this.stepSize
    ) {
      var y = this.columnSize + this.yScale * count * this.stepSize;
      const text = Number(scale / 10).toFixed(2);
      this.context.fillText(text, this.margin, y);
      if (Number.isInteger(scale / 10)) {
        this.context.moveTo(this.rowSize, y);
        this.context.lineTo(this.canvas.width, y);
      }

      count++;
    }
  }

  drawVerticalLines() {
    for (let i = 2; i <= this.sections; i++) {
      var x = i * this.xScale;
      const text = this.xAxis[i] ? this.xAxis[i].slice(5) : this.xAxis[i] || "";

      const newMargin =
        i % 2 == 0
          ? this.columnSize - this.margin
          : this.columnSize - this.margin * 2;

      this.context.fillText(text, x, this.columnSize - newMargin);
      this.context.moveTo(x, this.columnSize);
      this.context.lineTo(x, this.canvas.height - this.margin);
    }
  }

  formatPrices() {
    this.yAxis = this.yAxis.map((current) => {
      const [price] = current.map((current) => current.total_price);
      if (price) {
        return price * 10;
      }
      return undefined;
    });
  }

  setDefaultStyles() {
    this.context.fillStyle = "#273043";
    this.context.font = "14px Arial";
    this.context.strokeStyle = "#f1f1f1";
  }

  drawLines() {
    this.beginPath();
    this.context.strokeStyle = "#55868c";
    this.context.moveTo(0, this.yAxis[0]);

    for (let i = 1; i < this.sections; i++) {
      this.context.lineTo(i * this.xScale, this.yAxis[i]);
    }
    this.context.stroke();
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
