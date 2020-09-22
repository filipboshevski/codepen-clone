import { TOGGLE_IS_LOADING } from "./LoaderActions";

const INITIAL_STATE = {
    isLoading: true
};

export const loaderReducers = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case TOGGLE_IS_LOADING:
            return {
                ...state,
                isLoading: !state.isLoading
            };
        default:
            return state;
    }
};