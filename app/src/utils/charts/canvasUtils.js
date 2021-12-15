const DEFAULT_AXIS_COLOR = "#555";
const DEFAULT_LINE_WIDTH = 1;
const DEFAULT_FONT = "12pt Calibri";
const DEFAULT_TEXT_BASE_LINE = "middle";
const DEFAULT_STROKE_STYLE = "black";
const DEFAULT_FILL_STYLE = "black";
const DEFAULT_TEXT_ALIGN = "center";
const DEFAULT_CIRCLE_RADIUS = 3;

const canvasUtils = (settings => {

    const { ctx, scaleX, scaleY, x, y, height, width, dots} = settings;

    function drawLine({
        from,
        to,
        color = DEFAULT_AXIS_COLOR,
        lineWidth = DEFAULT_LINE_WIDTH,
      }) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
      }
      
      function drawTicks({
        totalTicks,
        coordinates,
        horizontalTick = 0,
        verticalTick = 0,
      }) {
        for (let i = 1; i <= totalTicks; i++) {
          ctx.beginPath();
          ctx.moveTo(coordinates.x(i), coordinates.y(i));
          ctx.lineTo(
            coordinates.x(i) + verticalTick,
            coordinates.y(i) - horizontalTick
          );
          ctx.stroke();
        }
      }
      
      function resetStyles({
        font = DEFAULT_FONT,
        fillStyle = DEFAULT_FILL_STYLE,
        textAlign = DEFAULT_TEXT_ALIGN,
        textBaseline = DEFAULT_TEXT_BASE_LINE,
        strokeStyle = DEFAULT_STROKE_STYLE,
      }) {
        ctx.font = font;
        ctx.fillStyle = fillStyle;
        ctx.textAlign = textAlign;
        ctx.textBaseline = textBaseline;
        ctx.strokeStyle = strokeStyle;
      }
      
      function printLabels({ coordinates, label, totalTicks }) {
        for (let number = 0; number < totalTicks; number++) {
          ctx.save();
          ctx.translate(coordinates.x(number), coordinates.y(number));
          ctx.fillText(label(number), 0, 0);
          ctx.restore();
        }
      }
      
      function drawTrajectory() {
        ctx.save();
        ctx.translate(x, y + height);
        ctx.scale(1, -1);
      
        ctx.lineWidth = DEFAULT_LINE_WIDTH;
        ctx.strokeStyle = DEFAULT_STROKE_STYLE;
        ctx.fillStyle = DEFAULT_FILL_STYLE;
      
        ctx.beginPath();
      
        const [firstPoint] = dots;
        ctx.moveTo(firstPoint.x * scaleX, firstPoint.y * scaleY);
      
        for (let index = 0; index < dots.length; index++) {
          const point = dots[index];
          const currentX = (index * scaleX) +  50;
          const currentY = point.y * scaleY;
          ctx.lineTo(currentX, currentY);
          ctx.stroke();
          ctx.closePath();
          ctx.beginPath();
          ctx.arc(currentX, currentY, DEFAULT_CIRCLE_RADIUS, 0, 2 * Math.PI, false);
          ctx.fill();
          ctx.closePath();
          ctx.beginPath();
          ctx.moveTo(currentX, currentY);
        }
        ctx.restore();
      }
      
      return {
        drawLine,
        drawTicks,
        resetStyles,
        printLabels,
        drawTrajectory,
      }
})


export default canvasUtils;
