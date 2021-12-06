import React, { useState, useEffect } from "react";
import ChartPlot from "../ChartPlot";
import Table from "../Table";
import API from "../../services";
import "./App.sass";
import { TABLE_OPTIONS } from "./constants";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.getOffers().then(setData);
  }, []);

  return (
    <>
      <Table data={data} options={TABLE_OPTIONS} />
      <ChartPlot data={data} />
    </>
  );
}

export default App;
