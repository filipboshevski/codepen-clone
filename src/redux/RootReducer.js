import {combineReducers} from 'redux';
import sourceDocReducer from './sourceDoc/SourceDocReducers';
import userReducers from './user/userReducers';

const rootReducer = combineReducers({
    srcDoc: sourceDocReducer,
    user: userReducers
});

export default rootReducer;