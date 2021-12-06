import React, { useState, useEffect } from "react";
import ChartPlot from "../ChartPlot";
import Table from "../Table";
import API from "../../services";
import "./App.sass";
import { CHART_PLOT_OPTIONS, TABLE_OPTIONS } from "../constants";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.getOffers().then(setData);
  }, []);

  return (
    <>
      {!!data.length ?
        <>
            <Table data={data} options={TABLE_OPTIONS} />
            <ChartPlot data={data} options={CHART_PLOT_OPTIONS} />
        </>
        : 
        <div className="loading">Loading...</div>
      }
    </>
  );
}

export default App;
