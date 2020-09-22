import userActionTypes from './userTypes';

export const setCurrentUser = user => ({
    type: userActionTypes.SET_CURRENT_USER,
    payload: user
});

export const signInSuccess = user => ({
    type: userActionTypes.SIGN_IN_SUCCESS,
    payload: user
});

export const signInFailure = error => ({
    type: userActionTypes.SIGN_IN_FAILURE,
    payload: error
});

export const onIsUserPersistedStart = () => ({
    type: userActionTypes.IS_USER_PERSISTED
});


export const updateProjectName = projectName => ({
    type: userActionTypes.UPDATE_PROJECT_NAME,
    payload: projectName
});

