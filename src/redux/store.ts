import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import covidReducer from "./slices/covidSlice";
import { covidSaga } from "./sagas/covidSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    covid: covidReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(covidSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
