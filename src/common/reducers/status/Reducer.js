import * as ActionTypes from "./ActionTypes";


export default function (state = { init_load: false, pop_msg: { show: false }, auth_dialog_show: false}, action) {
    switch(action.type) {
        case ActionTypes.UPDATE_STATUS: {
            return {...state, [action.feature]: action.value }
        }
        default:
            return state;
    }
}
