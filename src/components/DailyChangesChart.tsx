import React from "react";
import ReactECharts from "echarts-for-react";
import { CovidStateData } from "../types/covidTypes";

interface Props {
  covidData: CovidStateData;
}

const DailyChangesChart: React.FC<Props> = ({ covidData }) => {
  const option = {
    title: { text: "แนวโน้มการเปลี่ยนแปลงรายวัน" },
    tooltip: { trigger: "axis" },
    xAxis: { type: "category", data: covidData.results.map((item) => item.publishdate) },
    yAxis: { type: "value" },
    series: [
      { name: "ผู้ติดเชื้อรายใหม่", type: "line", data: covidData.results.map((item) => item.newCases) },
      { name: "ผู้เสียชีวิตรายใหม่", type: "line", data: covidData.results.map((item) => item.newDeaths) },
      { name: "ผู้หายป่วยรายใหม่", type: "line", data: covidData.results.map((item) => item.newRecovered) },
    ],
  };

  return <ReactECharts option={option} style={{ height: "400px", width: "100%" }} />;
};

export default DailyChangesChart;
