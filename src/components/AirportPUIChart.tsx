import React from "react";
import ReactECharts from "echarts-for-react";
import { CovidStateData } from "../types/covidTypes";

interface Props {
  covidData: CovidStateData;
}

const AirportPUIChart: React.FC<Props> = ({ covidData }) => {
  const option = {
    title: { text: "จำนวน PUI จากสนามบินต่างๆ" },
    tooltip: { trigger: "axis" },
    xAxis: { type: "category", data: covidData.results.map((item) => item.publishdate) },
    yAxis: { type: "value" },
    series: [
      { name: "สุวรรณภูมิ", type: "bar", data: covidData.results.map((item) => item.totalBKKAirportPUI) },
      { name: "ดอนเมือง", type: "bar", data: covidData.results.map((item) => item.totalDMKAirportPUI) },
      { name: "ภูเก็ต", type: "bar", data: covidData.results.map((item) => item.totalHKTAirportPUI) },
      { name: "เชียงใหม่", type: "bar", data: covidData.results.map((item) => item.totalCNXAirportPUI) },
      { name: "อุดรธานี", type: "bar", data: covidData.results.map((item) => item.totalURTAirportPUI) },
      { name: "อุบลราชธานี", type: "bar", data: covidData.results.map((item) => item.totalUBPAirportPUI) },
      { name: "อู่ตะเภา", type: "bar", data: covidData.results.map((item) => item.totalUTPAirportPUI) },
      { name: "ตราด", type: "bar", data: covidData.results.map((item) => item.totalUTHAirportPUI) },
    ],
  };

  return <ReactECharts option={option} style={{ height: "400px", width: "100%" }} />;
};

export default AirportPUIChart;
