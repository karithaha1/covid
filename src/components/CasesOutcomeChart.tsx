import React from "react";
import { Card, Row } from "antd";
import { CovidStateData } from "../types/covidTypes";

interface Props {
  covidData: CovidStateData;
}

interface CardData {
  title: string;
  value: number;
  color: string;
}

const CasesOutcomeCard: React.FC<Props> = ({ covidData }) => {
  if (!covidData.results.length) {
    return (
      <p>❌ ไม่มีข้อมูลผู้ติดเชื้อและผลการรักษา (Cases and Outcomes) ที่สามารถแสดงผลได้</p>
    );
  }

  const latestData = covidData.results[0];

  const data: CardData[] = [
    { title: "ผู้ติดเชื้อสะสม", value: latestData.totalCases || 0, color: "#8B0000" },
    { title: "หายป่วยแล้ว", value: latestData.totalRecovered || 0, color: "#228B22" },
    { title: "ยังรักษาตัวอยู่", value: latestData.currentlyInfectedPatients || 0, color: "#FFD700" },
    { title: "เสียชีวิต", value: latestData.totalDeaths || 0, color: "#4B0082" },
    { title: "อาการหนัก/วิกฤติ", value: latestData.currentlySeriousOrCritical || 0, color: "#FF4500" },
  ];

  return (
    <Row gutter={[0, 0]}>
      {data.map((item, index) => (
        <div key={index} className="flex w-full sm:flex-1/5">
          <Card
            // bordered={false}
            style={{
              backgroundColor: item.color,
              color: "white",
              textAlign: "center",
              borderRadius: "10px",
              boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
              width:"95%"
            }}
          >
            <h3 style={{ fontSize: "16px", fontWeight: "bold" }}>{item.title}</h3>
            <p style={{ fontSize: "24px", fontWeight: "bold", margin: 0 ,   padding: 0}}>
              {item.value.toLocaleString()} คน
            </p>
          </Card>
        </div>

      ))}
    </Row>
  );
};

export default CasesOutcomeCard;
