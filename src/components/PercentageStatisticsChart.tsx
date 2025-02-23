import React from "react";
import ReactECharts from "echarts-for-react";
import { CovidStateData } from "../types/covidTypes";

interface Props {
  covidData: CovidStateData;
}

const PercentageStatisticsChart: React.FC<Props> = ({ covidData }) => {
  if (!covidData.results.length) {
    return (
      <p style={{ color: "black", textAlign: "center", fontSize: "16px" }}>
         ไม่มีข้อมูลเปอร์เซ็นต์สถิติที่สามารถแสดงผลได้
      </p>
    );
  }

  const latestData = covidData.results[0];

  const data = [
    { value: latestData.totalPUIPercent || 0, name: "PUI" },
    { value: latestData.newCasesPercent || 0, name: "ติดเชื้อรายใหม่" },
    { value: latestData.totalCasesPercent || 0, name: "ติดเชื้อสะสม" },
    { value: latestData.totalRecoveredPercent || 0, name: "หายป่วย" },
    { value: latestData.totalDeathsPercent || 0, name: "เสียชีวิต" },
    { value: latestData.totalTestsPercent || 0, name: "ตรวจหาเชื้อ" },
    {
      value: latestData.currentlySeriousOrCrititalPercent || 0,
      name: "อาการหนัก",
    },
    {
      value: latestData.currentlyInfectedPatientsPercent || 0,
      name: "ยังรักษาอยู่",
    },
    {
      value: latestData.currentlyInfectedPatientsCapacityPercent || 0,
      name: "ครองเตียง",
    },
  ].filter((item) => item.value > 0);

  const option = {
  
    tooltip: {
      trigger: "item",
      formatter: "<b>{b}</b>: {c}%",
      textStyle: { color: "#000000", fontSize: 14 },
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      borderColor: "#000000",
      borderWidth: 1,
    },
    legend: {
      left: "center",
      top: "bottom",
      textStyle: { color: "#000000", fontSize: 14, fontWeight: "bold" },
    },
    series: [
      {
        name: "สถิติ",
        type: "pie",
        radius: ["40%", "65%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
        },
        itemStyle: {
          borderRadius: 5,
          borderColor: "#FFFFFF",
          borderWidth: 2,
        },
        data,
      },
    ],
    color: [
      "#001F3F",
      "#003366",
      "#004080",
      "#00509E",
      "#1E90FF",
      "#4682B4",
      "#6495ED",
      "#87CEFA",
      "#A9D0F5",
    ],
  };

  return (
    <>
      {data.length > 0 ? (
        <ReactECharts
          option={option}
          style={{ height: "400px", width: "100%" }}
        />
      ) : (
        <p style={{ color: "black", textAlign: "center", fontSize: "16px" }}>
           ไม่มีข้อมูลสำหรับ Pie Chart
        </p>
      )}
    </>
  );
};

export default PercentageStatisticsChart;
