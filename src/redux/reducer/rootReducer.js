import { combineReducers } from 'redux';
import userReducer from './userReducer';
import readingSettingReducer from './readingSettingReducer';

const rootReducer = combineReducers({
  user: userReducer,
  readingSetting: readingSettingReducer,
});

export default rootReducer;
