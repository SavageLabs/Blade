import * as ActionTypes from "./ActionTypes";

const targets = (state = [], action) => {
    switch(action.type) {
        case ActionTypes.ADD_CONNECTION:
            return [...state, action.connection];
        case ActionTypes.EDIT_CONNECTION: {
            const stateCpy = [...state];
            const find = stateCpy.find(con => con.id === action.id);
            if(!find) return stateCpy;
            const merged = {...find, ...action.data};
            stateCpy[stateCpy.indexOf(find)] = merged;
            return stateCpy;
        }    
        case ActionTypes.REMOVE_CONNECTION: {
            return state.filter(con => con.id !== action.id)
        }    
        default:
            return state;
    }
}
export default targets;