import { all, call, put, takeLatest } from 'redux-saga/effects';
import { firestore } from '../../firebase/firebase.config';
import { saveSrcDocSuccess } from '../../redux/sourceDoc/SourceDocActions';
import sourceDocTypes from '../../redux/sourceDoc/SourceDocTypes';

export function* saveSrcDoc({payload: {srcDoc, currentUser}}) {
    const userRef = yield firestore.doc(`users/${currentUser.id}`);
    const snapShot = yield userRef.get();
    if (snapShot.exists) {
        const response = yield userRef.set({
            ...currentUser,
            srcDoc
        }, { merge: true });
        yield put(saveSrcDocSuccess(response));
        return true;
    };
}

export function* onSaveSourceDocStart() {
    yield takeLatest(sourceDocTypes.SAVE_DOC_START, saveSrcDoc);
};

export function* srcDocSagas() {
    yield all([
        call(onSaveSourceDocStart)
    ]);
};