import {all, call, put, takeLatest} from 'redux-saga/effects';
import { firestore, getCurrentUser } from '../../firebase/firebase.config';
import { toggleIsLoading } from '../../redux/loader/LoaderActions';
import { updateCss, updateHtml, updateJs } from '../../redux/sourceDoc/SourceDocActions';
import { signInFailure, signInSuccess } from '../../redux/user/userActions';
import userActionTypes from '../../redux/user/userTypes';

export function* isUserPersisted() {
    try {
        const authUser = yield getCurrentUser();

        if (authUser) {
            const snapShot = yield firestore.doc(`users/${authUser.uid}`).get();
            const user = yield snapShot.data();
            const srcDoc = user.srcDoc;
            yield put(signInSuccess(user));
            if (srcDoc.html !== "") {
                yield put(updateHtml(srcDoc.html));
                yield put(updateCss(srcDoc.css));
                yield put(updateJs(srcDoc.js));
            };
            yield put(toggleIsLoading());
            return true;
        };

        yield put(toggleIsLoading());
    } catch (error) {
        yield put(signInFailure(error));
    };
};

export function* onIsUserPersistedStart() {
    yield takeLatest(userActionTypes.IS_USER_PERSISTED, isUserPersisted)
}

export function* userSagas() {
    yield all([
        call(onIsUserPersistedStart)
    ]);
};