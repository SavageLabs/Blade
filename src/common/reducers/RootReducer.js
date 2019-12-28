import { combineReducers } from "redux";
import status from "./status";
import app from "./app"
import targets from "./targets"
import connections from "./connections";

export default combineReducers({
    status,
    app,
    targets,
    connections
})