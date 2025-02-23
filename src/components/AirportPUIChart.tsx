import React from "react";
import ReactECharts from "echarts-for-react";
import { CovidStateData } from "../types/covidTypes";

interface Props {
  covidData: CovidStateData;
}

const AirportPUIChart: React.FC<Props> = ({ covidData }) => {
  if (!covidData.results.length) {
    return <p> ไม่มีข้อมูล  ข้อมูล PUI จากสนามบิน (Airport PUI)ที่สามารถแสดงผลได้</p>;
  }

  const latestData = covidData.results[0];

  const themeColors = [
    "#003366",
    "#004488",
    "#800080",
    "#4B0082",
    "#222222",
    "#444444",
    "#660066",
    "#0D47A1",
  ];

  const option = {
    title: {
      text: "ข้อมูล PUI จากสนามบิน (Airport PUI)",
      left: "center",
      textStyle: { color: "#003366" },
    },
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c}",
    },
    grid: {
      left: "10%",
      right: "10%",
      bottom: "15%",
    },
    xAxis: {
      type: "category",
      data: [
        "สุวรรณภูมิ",
        "ดอนเมือง",
        "ภูเก็ต",
        "เชียงใหม่",
        "อุดรธานี",
        "อุบลราชธานี",
        "อู่ตะเภา",
        "ตราด",
      ],
      axisLabel: {
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
        name: "PUI สนามบิน",
        type: "bar",
        data: [
          latestData.totalBKKAirportPUI || 0,
          latestData.totalDMKAirportPUI || 0,
          latestData.totalHKTAirportPUI || 0,
          latestData.totalCNXAirportPUI || 0,
          latestData.totalURTAirportPUI || 0,
          latestData.totalUBPAirportPUI || 0,
          latestData.totalUTPAirportPUI || 0,
          latestData.totalUTHAirportPUI || 0,
        ],
        barWidth: "50%",
        itemStyle: {
          opacity: 0.9,
          color: (params: any) => {
            return themeColors[params.dataIndex % themeColors.length];
          },
        },
      },
    ],
  };

  return (
    <ReactECharts option={option} style={{ height: "400px", width: "100%" }} />
  );
};

export default AirportPUIChart;
