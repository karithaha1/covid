import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { fetchCovidDataRequest } from "../redux/slices/covidSlice";
import ScreeningDataChart from "../components/ScreeningDataChart";
import PUIChart from "../components/PUIChart";
import AirportPUIChart from "../components/AirportPUIChart";
import CasesOutcomeChart from "../components/CasesOutcomeChart";
import DailyChangesChart from "../components/DailyChangesChart";
import PercentageStatisticsChart from "../components/PercentageStatisticsChart";
import { DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import BoxContent from "../components/BoxContent";
import TestingDataChart from "../components/TestingDataChart";

const { RangePicker } = DatePicker;
dayjs.extend(isBetween);

const CovidDashboard: React.FC = () => {
  const dispatch = useDispatch();
  const covidData = useSelector((state: RootState) => state.covid.data);
  const loading = useSelector((state: RootState) => state.covid.loading);
  const error = useSelector((state: RootState) => state.covid.error);

  const defaultStart = dayjs("2020-04-02", "YYYY-MM-DD");
  const defaultEnd = dayjs("2020-04-30", "YYYY-MM-DD");

  const [selectedDates, setSelectedDates] = useState<
    [Dayjs | null, Dayjs | null]
  >([defaultStart, defaultEnd]);
  const [filteredData, setFilteredData] = useState(covidData?.results || []);

  useEffect(() => {
    dispatch(fetchCovidDataRequest());
  }, [dispatch]);

  useEffect(() => {
    if (covidData?.results) {
      filterData(selectedDates);
    }
  }, [covidData]);

  const filterData = (dates: [Dayjs | null, Dayjs | null] | null) => {
    if (!dates || !dates[0] || !dates[1]) {
      setFilteredData(covidData?.results || []);
      return;
    }

    const startDate = dates[0].startOf("day");
    const endDate = dates[1].endOf("day");

    const filtered = covidData?.results.filter((item) => {
      const itemDate = dayjs(item.publishdate, "DD-MM-YYYY");
      return itemDate.isBetween(startDate, endDate, null, "[]");
    });

    setFilteredData(filtered || []);
  };

  const handleDateChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    setSelectedDates(dates || [defaultStart, defaultEnd]);
    filterData(dates);
  };

  const disabledDate = (current: Dayjs) => {
    return current.year() !== 2020;
  };

  return (
    <div className="p-4 flex flex-col gap-3 bg-gray-100">
      <BoxContent>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-900">
            COVID-19 Dashboard
          </h1>
          <RangePicker
            format="DD-MM-YYYY"
            value={selectedDates}
            onChange={handleDateChange}
            disabledDate={disabledDate}
            defaultPickerValue={[defaultStart, defaultEnd]}
          />
        </div>
        {covidData && filteredData.length > 0 && (
          <div className="mt-5">
            <CasesOutcomeChart
              covidData={{ ...covidData, results: filteredData }}
            />
          </div>
        )}
      </BoxContent>
      {!loading && !error && covidData && (
        <>
          {filteredData.length > 0 ? (
            <>
              <div className="grid grid-cols-3 gap-2">
                {/*  */}
                <div className="col-span-2 flex flex-col gap-2">
                  <BoxContent
                    title={
                      "ข้อมูลผู้ป่วยเข้าเกณฑ์สอบสวนโรค (PUI: Patients Under Investigation)"
                    }
                  >
                    <PUIChart
                      covidData={{ ...covidData, results: filteredData }}
                    />
                  </BoxContent>
                  <BoxContent title={"ข้อมูล PUI จากสนามบิน (Airport PUI)"}>
                    <AirportPUIChart
                      covidData={{ ...covidData, results: filteredData }}
                    />
                  </BoxContent>
                  <div className="grid 2xl:grid-cols-2 gap-2">
                    <BoxContent title={"ข้อมูลการคัดกรอง (Screening Data)"}>
                      <ScreeningDataChart
                        covidData={{ ...covidData, results: filteredData }}
                      />
                    </BoxContent>
                    <BoxContent
                      title={"ข้อมูลเปอร์เซ็นต์สถิติ (Percentage Statistics)"}
                    >
                      <PercentageStatisticsChart
                        covidData={{ ...covidData, results: filteredData }}
                      />
                    </BoxContent>
                  </div>
                </div>

                {/*  */}
                <div className="col-span-1">
                  <div className="sticky top-1">
                    <BoxContent>
                      <TestingDataChart
                        covidData={{ ...covidData, results: filteredData }}
                      />
                    </BoxContent>
                  </div>
                </div>
              </div>

              {/*  */}
              <div>
                <BoxContent
                  title={"ข้อมูลการเปลี่ยนแปลงรายวัน (Daily Changes)"}
                >
                  <DailyChangesChart
                    covidData={{ ...covidData, results: filteredData }}
                  />
                </BoxContent>
              </div>
            </>
          ) : (
            <p style={{ color: "red", fontSize: "16px" }}>
              ไม่มีข้อมูลที่ตรงกับช่วงวันที่เลือก
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default CovidDashboard;
