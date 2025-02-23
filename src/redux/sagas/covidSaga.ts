import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchCovidDataRequest,
  fetchCovidDataSuccess,
  fetchCovidDataFailure,
} from "../slices/covidSlice";
import { CovidStateData } from "../../types/covidTypes";
import axios, { AxiosResponse } from "axios";

// const API_URL = "https://covid19.traffy.in.th/api/state-covid19";
const API_URL =
  "https://thingproxy.freeboard.io/fetch/" +
  encodeURIComponent("https://covid19.traffy.in.th/api/state-covid19");

const fetchCovidDataAPI = async (): Promise<CovidStateData> => {
  const response: AxiosResponse<CovidStateData> = await axios.get(API_URL);
  return response.data;
};

function* fetchCovidDataSaga(): Generator<any, void, CovidStateData> {
  try {
    const data = yield call(fetchCovidDataAPI);
    yield put(fetchCovidDataSuccess(data));
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "เกิดข้อผิดพลาดไม่ทราบสาเหตุ";
    yield put(fetchCovidDataFailure(errorMessage));
  }
}

export function* covidSaga() {
  yield takeLatest(fetchCovidDataRequest.type, fetchCovidDataSaga);
}
