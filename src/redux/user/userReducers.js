import userActionTypes from './userTypes';

const INITIAL_STATE = {
    currentUser: null,
    error: null,
    isLoggedIn: false
};

const userReducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case userActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload,
                error: null,
                isLoggedIn: true
            }
        case userActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                error: null,
                isLoggedIn: true
            }
        case userActionTypes.SIGN_IN_FAILURE:
            return {
                ...state,
                error: action.payload,
                isLoggedIn: false
            }
        case userActionTypes.UPDATE_PROJECT_NAME:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    projectName: action.payload
                }
            }
        case userActionTypes.TOGGLE_IS_LOGGED_IN:
            return {
                ...state,
                isLoggedIn: !state.isLoggedIn
            }
        default:
            return state;
    }
};

export default userReducers;