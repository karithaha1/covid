import React from "react";
import ReactECharts from "echarts-for-react";
import { CovidStateData } from "../types/covidTypes";

interface Props {
  covidData: CovidStateData;
}

const CasesOutcomeChart: React.FC<Props> = ({ covidData }) => {
  if (!covidData.results.length) {
    return <p>❌ ไม่มีข้อมูลผู้ติดเชื้อและผลการรักษาที่สามารถแสดงผลได้</p>;
  }

  const latestData = covidData.results[0];

  const lineOption = {
    title: { text: "ข้อมูลผู้ติดเชื้อและผลการรักษา" },
    tooltip: { trigger: "axis" },
    xAxis: { type: "category", data: covidData.results.map((item) => item.publishdate) },
    yAxis: { type: "value" },
    series: [
      { name: "ผู้ติดเชื้อสะสม", type: "line", data: covidData.results.map((item) => item.totalCases || 0) },
      { name: "หายป่วยแล้ว", type: "line", data: covidData.results.map((item) => item.totalRecovered || 0) },
      { name: "จำนวนผู้ติดเชื้อที่ยังรักษาตัวอยู่", type: "line", data: covidData.results.map((item) => item.currentlyInfectedPatients || 0) },
      { name: "เสียชีวิต", type: "line", data: covidData.results.map((item) => item.totalDeaths || 0) },
      { name: "จำนวนผู้ป่วยอาการหนักหรือวิกฤติ", type: "line", data: covidData.results.map((item) => item.currentlySeriousOrCritical  || 0) },
    ],
  };

  const pieOption = latestData
    ? {
        title: { text: "สัดส่วนผู้ติดเชื้อ หายป่วย และเสียชีวิต" },
        tooltip: { trigger: "item" },
        series: [
          {
            name: "COVID-19",
            type: "pie",
            radius: "50%",
            data: [
              { value: latestData.totalCases || 0, name: "ผู้ติดเชื้อ" },
              { value: latestData.totalRecovered || 0, name: "หายป่วย" },
              { value: latestData.totalDeaths || 0, name: "เสียชีวิต" },
            ],
          },
        ],
      }
    : null;

  return (
    <>
      <ReactECharts option={lineOption} style={{ height: "400px", width: "100%" }} />
      {pieOption ? (
        <ReactECharts option={pieOption} style={{ height: "400px", width: "100%" }} />
      ) : (
        <p>❌ ไม่มีข้อมูลสำหรับ Pie Chart</p>
      )}
    </>
  );
};

export default CasesOutcomeChart;
