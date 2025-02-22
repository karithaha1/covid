import React from "react";
import ReactECharts from "echarts-for-react";
import { CovidStateData } from "../types/covidTypes";

interface Props {
  covidData: CovidStateData;
}

const ScreeningDataChart: React.FC<Props> = ({ covidData }) => {
  const option = {
    title: { text: "ข้อมูลการคัดกรอง (Screening Data)" },
    tooltip: { trigger: "axis" },
    xAxis: { type: "category", data: covidData.results.map((item) => item.publishdate) },
    yAxis: { type: "value" },
    series: [
      { name: "สายการบิน", type: "bar", data: covidData.results.map((item) => item.totalScreeningAirlines) },
      { name: "ชายแดน", type: "bar", data: covidData.results.map((item) => item.totalScreeningBorder) },
      { name: "ตรวจคนเข้าเมือง", type: "bar", data: covidData.results.map((item) => item.totalScreeningImmigration) },
    ],
  };

  return <ReactECharts option={option} style={{ height: "400px", width: "100%" }} />;
};

export default ScreeningDataChart;
