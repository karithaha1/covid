import React from "react";
import ReactECharts from "echarts-for-react";
import { CovidStateData } from "../types/covidTypes";

interface Props {
  covidData: CovidStateData;
}

const PercentageStatisticsChart: React.FC<Props> = ({ covidData }) => {
  if (!covidData.results.length) {
    return <p>❌ ไม่มีข้อมูลเปอร์เซ็นต์สถิติที่สามารถแสดงผลได้</p>;
  }

  const latestData = covidData.results[0];

  const option = latestData
    ? {
        title: { text: "เปอร์เซ็นต์สถิติ COVID-19" },
        tooltip: { trigger: "item" },
        series: [
          {
            name: "สถิติ",
            type: "pie",
            radius: "50%",
            data: [
              { value: latestData.totalPUIPercent || 0, name: "PUI" },
              { value: latestData.totalCasesPercent || 0, name: "ติดเชื้อ" },
              { value: latestData.totalRecoveredPercent || 0, name: "หายป่วย" },
              { value: latestData.totalDeathsPercent || 0, name: "เสียชีวิต" },
              { value: latestData.totalTestsPercent || 0, name: "ตรวจหาเชื้อ" },
              { value: latestData.currentlySeriousOrCrititalPercent || 0, name: "อาการหนัก" },
              { value: latestData.currentlyInfectedPatientsPercent || 0, name: "ยังรักษาอยู่" },
            ],
          },
        ],
      }
    : null;

  return (
    <>
      {option ? (
        <ReactECharts option={option} style={{ height: "400px", width: "100%" }} />
      ) : (
        <p>❌ ไม่มีข้อมูลสำหรับ Pie Chart</p>
      )}
    </>
  );
};

export default PercentageStatisticsChart;
