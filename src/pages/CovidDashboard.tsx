import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { fetchCovidDataRequest } from "../redux/slices/covidSlice";
import ScreeningDataChart from "../components/ScreeningDataChart";
import PUIChart from "../components/PUIChart";
import AirportPUIChart from "../components/AirportPUIChart";
import CasesOutcomeChart from "../components/CasesOutcomeChart";
import TestingDataChart from "../components/TestingDataChart";
import DailyChangesChart from "../components/DailyChangesChart";
import PercentageStatisticsChart from "../components/PercentageStatisticsChart";
import { DatePicker } from "antd";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

const CovidDashboard: React.FC = () => {
  const dispatch = useDispatch();
  const covidData = useSelector((state: RootState) => state.covid.data);
  const loading = useSelector((state: RootState) => state.covid.loading);
  const error = useSelector((state: RootState) => state.covid.error);

  const [filteredData, setFilteredData] = React.useState(
    covidData?.results || []
  );
  const [dateRange, setDateRange] = React.useState<
    [dayjs.Dayjs | null, dayjs.Dayjs | null]
  >([null, null]);

  useEffect(() => {
    dispatch(fetchCovidDataRequest());
  }, [dispatch]);

  useEffect(() => {
    setFilteredData(covidData?.results || []);
  }, [covidData]);

  const handleDateChange = (
    dates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null
  ) => {
    setDateRange(dates || [null, null]);

    if (!dates || !dates[0] || !dates[1]) {
      setFilteredData(covidData?.results || []);
      return;
    }

    const startDate = dates[0].startOf("day").toISOString();
    const endDate = dates[1].endOf("day").toISOString();

    const filtered = covidData?.results.filter((item) => {
      const itemDate = dayjs(item.publishdate, "DD-MM-YYYY").toISOString();
      return itemDate >= startDate && itemDate <= endDate;
    });

    setFilteredData(filtered || []);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>📊 COVID-19 Dashboard</h1>

      <RangePicker
        format="DD-MM-YYYY"
        onChange={handleDateChange}
        style={{ marginBottom: "20px" }}
      />

      {loading && <p>⏳ กำลังโหลดข้อมูล...</p>}
      {error && <p style={{ color: "red" }}>❌ {error}</p>}
      {!loading && !error && covidData && (
        <>
          <p>
            📅 อัปเดตล่าสุด: {new Date(covidData.last_update).toLocaleString()}
          </p>

          <ScreeningDataChart
            covidData={{ ...covidData, results: filteredData }}
          />
          <PUIChart covidData={{ ...covidData, results: filteredData }} />
          <AirportPUIChart
            covidData={{ ...covidData, results: filteredData }}
          />
          <CasesOutcomeChart
            covidData={{ ...covidData, results: filteredData }}
          />
          <TestingDataChart
            covidData={{ ...covidData, results: filteredData }}
          />
          <DailyChangesChart
            covidData={{ ...covidData, results: filteredData }}
          />
          <PercentageStatisticsChart
            covidData={{ ...covidData, results: filteredData }}
          />
        </>
      )}
    </div>
  );
};

export default CovidDashboard;
