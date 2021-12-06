import React, { useState, useRef, useEffect } from "react";
import SimpleChartPlot from "../../utils/charts/plot";
import parseOffers from "../../utils/parsers/offers";
import { RETAILER, PRODUCT } from "../constants";
import "./ChartPlot.sass";

function ChartPlot({ data, options }) {
  const [selectedRetailer, setSelectedRetailer] = useState(RETAILER);
  const [selectedProduct, setSelectedProduct] = useState(PRODUCT);
  const canvasRef = useRef(null);

  const { retailerNames, products, xAxis, yAxis } = parseOffers(
    data,
    selectedRetailer,
    selectedProduct
  );

  useEffect(() => {
    if (canvasRef && canvasRef.current && data.length) {
      const plotConfiguration = { ...options, xAxis, yAxis };
      const simpleChartPlot = new SimpleChartPlot(
        canvasRef.current,
        plotConfiguration
      );
      simpleChartPlot.init();
    }
  }, [useRef, data, selectedRetailer, selectedProduct]);

  const handleSelectProduct = ({ target: { value } }) =>
    setSelectedProduct(value);
  const chartRetailerClassName = (retailer) =>
    retailer === selectedRetailer ? "chart__retailer--active" : "";

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
            <option key={product} value={product}>
              {product}
            </option>
          ))}
        </select>
      </div>
      <div className="chart">
        {!!yAxis.length ? (
          <canvas ref={canvasRef} height="500" />
        ) : (
          <div className="chart__empty">There is no data to show</div>
        )}
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
