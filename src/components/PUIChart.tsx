import React from "react";
import ReactECharts from "echarts-for-react";
import { CovidStateData } from "../types/covidTypes";

interface Props {
  covidData: CovidStateData;
}

const PUIChart: React.FC<Props> = ({ covidData }) => {
  if (!covidData.results.length) {
    return <p>❌ ไม่มีข้อมูล PUI ที่สามารถแสดงผลได้</p>;
  }

  const latestData = covidData.results[0];

  const barOption = {
    title: { text: "ผู้ป่วยเข้าเกณฑ์สอบสวนโรค (PUI)" },
    tooltip: { trigger: "axis" },
    xAxis: { type: "category", data: covidData.results.map((item) => item.publishdate) },
    yAxis: { type: "value" },
    series: [
      { name: "PUI ทั้งหมด", type: "bar", data: covidData.results.map((item) => item.totalPUI) },
      { name: "PUI ในโรงพยาบาล", type: "bar", data: covidData.results.map((item) => item.totalHospitalPUI) },
    ],
  };

  const pieOption = latestData
    ? {
        title: { text: "สัดส่วน PUI ในแต่ละโรงพยาบาล" },
        tooltip: { trigger: "item" },
        series: [
          {
            name: "PUI",
            type: "pie",
            radius: "50%",
            data: [
              { value: latestData.totalPrivateHospital || 0, name: "โรงพยาบาลเอกชน" },
              { value: latestData.totalPublicHospital || 0, name: "โรงพยาบาลรัฐ" },
              { value: latestData.totalOtherPUI || 0, name: "อื่นๆ" },
            ],
          },
        ],
      }
    : null;

  return (
    <>
      <ReactECharts option={barOption} style={{ height: "400px", width: "100%" }} />
      {pieOption ? (
        <ReactECharts option={pieOption} style={{ height: "400px", width: "100%" }} />
      ) : (
        <p>❌ ไม่มีข้อมูลสำหรับ Pie Chart</p>
      )}
    </>
  );
};

export default PUIChart;
