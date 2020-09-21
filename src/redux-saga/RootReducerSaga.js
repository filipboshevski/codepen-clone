import { all, call } from "redux-saga/effects";
import { srcDocSagas } from "./srcDoc/SrcDocSagas";

export function* rootSagaReducer() {
    yield all([
        call(srcDocSagas)
    ])
};