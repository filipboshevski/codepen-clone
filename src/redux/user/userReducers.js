import userActionTypes from './userTypes';

const INITIAL_STATE = {
    currentUser: null,
    error: null
};

const userReducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case userActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload,
                error: null
            }
        case userActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                error: null
            }
        case userActionTypes.SIGN_IN_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case userActionTypes.UPDATE_PROJECT_NAME:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    projectName: action.payload
                }
            }
        default:
            return state;
    }
};

export default userReducers;