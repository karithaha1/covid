import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CovidStateData, CovidState } from "../../types/covidTypes";

const initialState: CovidState = {
  data: null,
  loading: false,
  error: null,
};

const covidSlice = createSlice({
  name: "covid",
  initialState,
  reducers: {
    fetchCovidDataRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCovidDataSuccess(state, action: PayloadAction<CovidStateData>) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchCovidDataFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchCovidDataRequest,
  fetchCovidDataSuccess,
  fetchCovidDataFailure,
} = covidSlice.actions;
export default covidSlice.reducer;
