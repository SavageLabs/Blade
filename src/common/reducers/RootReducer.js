import { combineReducers } from 'redux';
import meta from './meta'
import sftp from './sftp'
const reducers = combineReducers({
    meta: meta.reducer,
    sftp: sftp.reducer
  });
  
  export default reducers;
  