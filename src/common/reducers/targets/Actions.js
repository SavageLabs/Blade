import * as ActionTypes from "./ActionTypes";
//const fs = window.require("electron").remote.require("fs");
const fs = require("fs")
export const addConnection = (name, type, host, portString, username, authType, password, saveAuth, keyPath) => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        const existing = getState().targets;
        if(existing.find(con => con.name.toLowerCase() === name)) {
            reject("Connection with same name already exists");
            return;
        }
        const parsedPort = parseInt(portString);
        if(isNaN(parsedPort)) {
            reject("Port does not seam to be a number");
            return;
        }
        const connection = {
            id: Date.now(),
            name,
            host,
            port: parsedPort,
            type,
            username,
            authType,
            saveAuth
        }
        
       if(saveAuth) connection.password = password;
       if (type === "sftp" && authType === "openssh_key") {
           fs.exists(keyPath, (exsists) => {
               if(!exsists) {
                   reject("Key File not found");
                   return;
               }
               connection.key_path = keyPath;
               dispatch({type: ActionTypes.ADD_CONNECTION, connection});
               resolve()
           })
       } else {
           dispatch({type: ActionTypes.ADD_CONNECTION, connection});
           resolve()
       }
    })
}