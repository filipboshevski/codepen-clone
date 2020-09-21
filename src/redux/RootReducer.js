import {combineReducers} from 'redux';
import sourceDocReducer from './sourceDoc/SourceDocReducers';

const rootReducer = combineReducers({
    srcDoc: sourceDocReducer
});

export default rootReducer;