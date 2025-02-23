import React from "react";
import ReactECharts from "echarts-for-react";
import { CovidStateData } from "../types/covidTypes";

interface Props {
  covidData: CovidStateData;
}

const ScreeningDataChart: React.FC<Props> = ({ covidData }) => {
  if (!covidData.results.length) {
    return (
      <p style={{ color: "black", textAlign: "center", fontSize: "16px" }}>
         ไม่มีข้อมูลการคัดกรองที่สามารถแสดงผลได้
      </p>
    );
  }

  const latestData = covidData.results[0];

  const data = [
    {
      value: latestData.totalScreeningAirlines || 0,
      name: "เที่ยวบินที่คัดกรอง",
    },
    {
      value: latestData.totalScreeningAirlinePassengers || 0,
      name: "ผู้โดยสารสายการบินที่คัดกรอง",
    },
    { value: latestData.totalScreeningShips || 0, name: "เรือที่คัดกรอง" },
    {
      value: latestData.totalScreeningShipPassengers || 0,
      name: "ผู้โดยสารเรือที่คัดกรอง",
    },
    {
      value: latestData.totalScreeningBorder || 0,
      name: "คัดกรองบริเวณชายแดน",
    },
    {
      value: latestData.totalScreeningImmigration || 0,
      name: "คัดกรองด้านตรวจคนเข้าเมือง",
    },
  ].filter((item) => item.value > 0);

  const totalValue = data.reduce((sum, item) => sum + item.value, 0);

  const [centerText] = React.useState({
    name: "รวมทั้งหมด",
    value: totalValue,
  });

  const option = {
    tooltip: {
      trigger: "item",
      formatter: "<b>{b}</b>: {c}",
      textStyle: { color: "#000000", fontSize: 14 },
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      borderColor: "#000000",
      borderWidth: 1,
    },
    legend: {
      left: "center",
      top: "bottom",
      textStyle: { color: "#000000", fontSize: 14, fontWeight: "bold"  },
    },
    series: [
      {
        name: "Screening Data",
        type: "pie",
        radius: ["70%", "55%"],
        avoidLabelOverlap: false,
        minAngle: 25,
        itemStyle: {
          borderRadius: 999999,
          borderColor: "#FFFFFF",
          borderWidth: 2,
        },
        label: {
          position: "center",
          show: true,
          fontSize: 20,
          fontWeight: "bold",
          formatter: () =>
            `${centerText.name}\n${centerText.value.toLocaleString()}`,
        },
        data,
      },
    ],
    color: [
      "#002147", 
      "#003366", 
      "#004080", 
      "#00509E", 
      "#1E90FF", 
      "#4682B4", 
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

export default ScreeningDataChart;
