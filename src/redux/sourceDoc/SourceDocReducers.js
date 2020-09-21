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
        case sourceDocTypes.LOAD_SRC_DOC:
            return {
                ...state,
                html: action.payload.html,
                css: action.payload.css,
                js: action.payload.js
            }
        default:
            return state;
    };
};

export default sourceDocReducer;