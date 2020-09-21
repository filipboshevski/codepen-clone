import sourceDocTypes from './SourceDocTypes';

const INITIAL_STATE = {
    html: '',
    css: '',
    js: ''
};

const sourceDocReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case sourceDocTypes.UPDATE_HTML:
            return {
                ...state,
                html: action.payload
            }
        case sourceDocTypes.UPDATE_CSS:
            return {
                ...state,
                css: action.payload
            }
        case sourceDocTypes.UPDATE_JS:
            return {
                ...state,
                js: action.payload
            }
        default:
            return state;
    };
};

export default sourceDocReducer;