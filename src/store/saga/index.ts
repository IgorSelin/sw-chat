import { all, spawn } from "redux-saga/effects";
import { peopleSaga } from "./people.saga";

export default function* rootSaga() {
  const sagas = [peopleSaga];

  yield all(sagas.map((s) => spawn(s)));
}
