import {combineReducers} from 'redux';
import { loaderReducers } from './loader/LoaderReducers';
import sourceDocReducer from './sourceDoc/SourceDocReducers';
import userReducers from './user/userReducers';

const rootReducer = combineReducers({
    srcDoc: sourceDocReducer,
    user: userReducers,
    loader: loaderReducers
});

export default rootReducer;