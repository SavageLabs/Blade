import * as ActionTypes from "./ActionTypes";
import { combineReducers } from "redux"

const menu = (state = false, action) => {
    switch(action.type) {
        case ActionTypes.TOGGLE_MENU:
            return !state;
        default:
            return state;
    }
}
export default combineReducers({
    menu
})