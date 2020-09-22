import { all, call } from "redux-saga/effects";
import { srcDocSagas } from "./srcDoc/SrcDocSagas";
import { userSagas } from "./user/UserSagas";

export function* rootSagaReducer() {
    yield all([
        call(srcDocSagas),
        call(userSagas)
    ]);
};