import React from "react";
import ReactECharts from "echarts-for-react";
import { CovidStateData } from "../types/covidTypes";

interface Props {
  covidData: CovidStateData;
}

const DailyChangesChart: React.FC<Props> = ({ covidData }) => {
  if (!covidData.results.length) {
    return <p> ไม่มีข้อมูลการเปลี่ยนแปลงรายวัน (Daily Changes) ที่สามารถแสดงผลได้</p>;
  }

  const results = covidData.results;
  const dates = results.map((item) => item.publishdate);

  const option = {
   
    tooltip: { 
      trigger: "axis",
      axisPointer: { type: "cross" } 
    },
    legend: {
      left: "center",
      top: "bottom",
      textStyle: { color: "#003366" },
    },
    grid: {
      left: "10%",
      right: "10%",
      bottom: "15%",
    },
    xAxis: {
      type: "category",
      data: dates,
      axisLabel: {
        rotate: 20,
        fontSize: 12,
        color: "#003366",
      },
    },
    yAxis: {
      type: "log",
      min: 1,
      axisLabel: { color: "#003366" },
    },
    series: [
      {
        name: "ผู้ติดเชื้อรายใหม่",
        type: "line",
        data: results.map((item) => item.newCases || 0),
        color: "#001F3F", 
        areaStyle: { color: "rgba(0, 31, 63, 0.3)" },
        smooth: true,
      },
      {
        name: "ผู้เสียชีวิตรายใหม่",
        type: "line",
        data: results.map((item) => item.newDeaths || 0),
        color: "#003366", 
        areaStyle: { color: "rgba(0, 51, 102, 0.3)" },
        smooth: true,
      },
      {
        name: "PUI รายใหม่",
        type: "line",
        data: results.map((item) => item.newPUI || 0),
        color: "#004080", 
        areaStyle: { color: "rgba(0, 64, 128, 0.3)" },
        smooth: true,
      },
      {
        name: "ผู้หายป่วยรายใหม่",
        type: "line",
        data: results.map((item) => item.newRecovered || 0),
        color: "#00509E", 
        areaStyle: { color: "rgba(0, 80, 158, 0.3)" },
        smooth: true,
      },
      {
        name: "ผู้ป่วยอาการหนักรายใหม่",
        type: "line",
        data: results.map((item) => item.newSeriousOrCritical || 0),
        color: "#1E90FF", 
        areaStyle: { color: "rgba(30, 144, 255, 0.3)" },
        smooth: true,
      },
      {
        name: "ผู้ติดเชื้อรายใหม่ทั้งหมด",
        type: "line",
        data: results.map((item) => item.newInfectedPatients || 0),
        color: "#4682B4", 
        areaStyle: { color: "rgba(70, 130, 180, 0.3)" },
        smooth: true,
      },
      {
        name: "จำนวนตรวจหาเชื้อรายใหม่",
        type: "line",
        data: results.map((item) => item.newTests || 0),
        color: "#6495ED", 
        areaStyle: { color: "rgba(100, 149, 237, 0.3)" },
        smooth: true,
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: "400px", width: "100%" , padding:"0px" }} />;
};

export default DailyChangesChart;
