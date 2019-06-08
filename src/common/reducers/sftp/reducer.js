import { combineReducers } from "redux";
import * as ActionTypes from "./actionTypes";
const fs = window.require('fs');

function isDir(mode) {
    return (mode & fs.constants.S_IFDIR) === fs.constants.S_IFDIR;
  }

function connections(state = [], action) {
  switch (action.type) {
    case ActionTypes.ADD_CONNECTION: {
        return [...state, {
            id: action.id,
            conn: action.conn,
            sftp: action.sftp,
            folder: action.list.map(e => ({ ...e, isDir: isDir(e.attrs.mode)})),
            path: action.path
        }];
        
    }
    case ActionTypes.UPDATE_FOLDER: {
        const entry = state[action.id];
        entry.path = action.path
        entry.folder = action.list.map(e => ({ ...e, isDir: isDir(e.attrs.mode)}));
        state[action.id] = entry;
        return [...state];
    }
    default:
      return state;
  }
}
function currentActive(state = null, action) {
    switch(action.type) {
        case ActionTypes.UPDATE_ACTIVE: {
            return action.id;
        }
        default:
            return state;
    }
}

export default combineReducers({
    connections,
    currentActive
});