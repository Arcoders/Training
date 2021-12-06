import React, { useState, useRef, useEffect } from "react";
import SimpleChartPlot from "../../utils/charts/plot";
import parseOffers from "../../utils/parsers/offers";
import "./ChartPlot.sass";

function ChartPlot({ data }) {
  const [selectedRetailer, setSelectedRetailer] = useState("Amazon ES");
  const [selectedProduct, setSelectedProduct] = useState(
    "Maestros de Hojiblanca El Nuestro 1L"
  );
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef && canvasRef.current && data.length) {
      const { xAxis, yAxis } = parseOffers(
        data,
        selectedRetailer,
        selectedProduct
      );
      const simpleChartPlot = new SimpleChartPlot(
        canvasRef.current,
        xAxis,
        yAxis
      );
      simpleChartPlot.onResize();
      simpleChartPlot.draw();
    }
  }, [useRef, data, selectedRetailer, selectedProduct]);

  const handleSelectProduct = ({ target: { value } }) =>
    setSelectedProduct(value);
  const chartRetailerClassName = (retailer) =>
    retailer === selectedRetailer ? "chart__retailer--active" : "";

  const { retailerNames, products, yAxis } = parseOffers(data);

  return (
    <div className="container">
      <div className="search">
        <h3>{selectedProduct}</h3>
        <select
          className="search__select"
          value={selectedProduct}
          onChange={handleSelectProduct}
        >
          {products.map((product) => (
            <option key={product} value={product}>{product}</option>
          ))}
        </select>
      </div>
      <div className="chart">
        <canvas ref={canvasRef} height="500" />
        <p>
          {retailerNames.map((retailer) => (
            <span
              key={retailer}
              className={`chart__retailer ${chartRetailerClassName(retailer)}`}
              onClick={() => setSelectedRetailer(retailer)}
            >
              {retailer}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}

export default ChartPlot;
