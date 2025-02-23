import React from "react";
import ReactECharts from "echarts-for-react";
import { CovidStateData } from "../types/covidTypes";

interface Props {
  covidData: CovidStateData;
}

const PUISunburstChart: React.FC<Props> = ({ covidData }) => {
  if (!covidData.results.length) {
    return (
      <p style={{ color: "black", textAlign: "center", fontSize: "16px" }}>
         ไม่มีข้อมูลผู้ป่วยเข้าเกณฑ์สอบสวนโรค (PUI: Patients Under
        Investigation)
      </p>
    );
  }

  const latestData = covidData.results[0];

  
  const totalPUI = latestData.totalPUI || 1;
  const travelPUI = latestData.totalAirlinesAndShipsPUI || 1;
  const airlinePUI = latestData.totalAirlinePUI || 1;
  const shipPUI = latestData.totalShipPUI || 1;

  const hospitalPUI = latestData.totalHospitalPUI || 1;
  const privateHospitalPUI = latestData.totalPrivateHospital || 1;
  const publicHospitalPUI = latestData.totalPublicHospital || 1;

  const otherPUI = latestData.totalOtherPUI || 1;

  
  const option = {
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c}",
    },
    series: [
      {
        type: "sunburst",
        radius: ["30%", "85%"],
        label: {
          show: false,
        },
        minAngle: 20,
        levels: [
          {},
          {
            r0: "35%",
            r: "65%",
            itemStyle: { borderWidth: 2 },
            label: { fontSize: 14, fontWeight: "bold" },
          },
          {
            r0: "70%",
            r: "85%",
            label: { fontSize: 12 },
          },
        ],
        data: [
          {
            name: "PUI จากผู้เดินทาง",
            value: travelPUI,
            itemStyle: { color: "#FF4500" }, 
            children: [
              {
                name: "ผู้โดยสารสายการบิน",
                value: airlinePUI,
                itemStyle: { color: "#FF6347" }, 
              },
              {
                name: "ผู้โดยสารทางเรือ",
                value: shipPUI,
                itemStyle: { color: "#FF7F50" }, 
              },
            ],
          },
          {
            name: "PUI ในโรงพยาบาล",
            value: hospitalPUI,
            itemStyle: { color: "#1E3A8A" }, 
            children: [
              {
                name: "โรงพยาบาลเอกชน",
                value: privateHospitalPUI,
                itemStyle: { color: "#1E40AF" }, 
              },
              {
                name: "โรงพยาบาลรัฐ",
                value: publicHospitalPUI,
                itemStyle: { color: "#3B82F6" }, 
              },
            ],
          },
          {
            name: "PUI อื่น ๆ",
            value: otherPUI,
            itemStyle: { color: "#4B0082" }, 
            children: [],
          },
        ],
      },
      {
        
        type: "pie",
        radius: ["0%", "25%"],
        label: {
          position: "center",
          formatter: `{b|รวมทั้งหมด}\n\n{c|${totalPUI.toLocaleString()} คน}`,
          rich: {
            b: { fontSize: 14, fontWeight: "bold", color: "#1E293B" }, 
            c: { fontSize: 24, fontWeight: "bold", color: "#000" }, 
          },
        },
        data: [
          {
            value: totalPUI,
            name: "PUI ทั้งหมด",
            itemStyle: { color: "white" },
          },
        ],
        silent: true, 
      },
    ],
  };

  return (
    <ReactECharts option={option} style={{ height: "500px", width: "100%" }} />
  );
};

export default PUISunburstChart;
