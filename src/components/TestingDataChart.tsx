import React from "react";
import ReactECharts from "echarts-for-react";
import { CovidStateData } from "../types/covidTypes";

interface Props {
  covidData: CovidStateData;
}

const TestingDataChart: React.FC<Props> = ({ covidData }) => {
  const option = {
    title: { text: "แนวโน้มการตรวจหาเชื้อ COVID-19" },
    tooltip: { trigger: "axis" },
    xAxis: { type: "category", data: covidData.results.map((item) => item.publishdate) },
    yAxis: { type: "value" },
    series: [
      { name: "ตรวจเชื้อทั้งหมด", type: "line", data: covidData.results.map((item) => item.totalTests) },
    ],
  };

  return <ReactECharts option={option} style={{ height: "400px", width: "100%" }} />;
};

export default TestingDataChart;
