import * as ActionTypes from "./ActionTypes";
import { updateInfoStatus } from "../status/Actions";
import * as Adapters from "../../adapters";
const fs = window.require("electron").remote.require("fs");
const { dialog } = window.require("electron").remote;

export function downloadFile(path, fileName, adapter) {
  dialog
    .showSaveDialog(null, {
      defaultPath: fileName
    })
    .then(({ filePath: name }) => {
        if(name) {
            adapter.download(path, name)
        }
    });
}

const requestAuthData = (keyFile, dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch(
      updateInfoStatus("auth_dialog_callback", (pass, keyFileResp) => {
        resolve({ password: pass, key_path: keyFileResp });
      })
    );
    dispatch(updateInfoStatus("auth_dialog_key_file", keyFile));
    dispatch(updateInfoStatus("auth_dialog_show", true));
  });
};
export const buildConnection = con_id => (dispatch, getState) => {
  return new Promise(async (resolve, reject) => {
    const id = Date.now();
    const config = getState().targets.find(con => con.id === con_id);
    if (!config) {
      reject("no_config");
      return;
    }
    const { password, key_path } = config.saveAuth
      ? config
      : await requestAuthData(
          config.type === "sftp" && config.authType === "openssh_key",
          dispatch
        );
    const connectionObj = {
      id,
      host: config.host,
      con_id,
      state: "init",
      name: config.name,
      type: config.type
    };
    dispatch({ type: ActionTypes.ADD_CONNECTION, connection: connectionObj });
    const authData = {
      host: config.host,
      port: config.port,
      username: config.username
    };
    if (config.type === "sftp" && config.authType === "openssh_key") {
      const sshPrivateFile = fs.readFileSync(key_path);
      authData.privateKey = sshPrivateFile;
      if (password.length > 0) {
        authData.passphrase = password;
      }
    } else {
      authData.password = password;
    }
    switch (config.type) {
      case "sftp": {
        const adapter = new Adapters.Sftp(authData);
        await adapter.connect();
        dispatch({
          type: ActionTypes.EDIT_CONNECTION,
          id,
          data: { state: "reading", adapter }
        });
        await dispatch(readDir(adapter, id, undefined))
        break;
      }
      default:
        return;
    }
    resolve(id)
    // const conn = new FtpClient();
    // dispatch({type: ActionTypes.EDIT_CONNECTION, id, data: { state: "loading", connectionInstance: conn, ftpInstance: conn}});
    // conn.on('ready', function() {
    //     dispatch({type: ActionTypes.EDIT_CONNECTION, id, data: { state: "reading"}});
    //     dispatch(readDirFtp(conn, id)).then(res => {
    //         dispatch({type: ActionTypes.EDIT_CONNECTION, id, data: { state: "ready"}});

    //     }).catch(err => {
    //         dispatch({type: ActionTypes.EDIT_CONNECTION, id, data: { state: "failed", error: err}});
    //     })
    //   });
  });
};
export function updateDir(id, pathChange, item) {
  return async (dispatch, getState) => {
    const entry = getState().connections.meta.find(c => c.id === id);
    const currPath = getState().connections.files[id].cwd;
    if (!entry) return;
    let newPath;
    if (pathChange === "..") {
      const split = currPath.split("/");
      newPath = `${split.splice(0, split.length - 2).join("/")}/`;
    } else {
      if (item.isDir) newPath = `${currPath}${pathChange}/`;
      else newPath = `${currPath}${pathChange}`;
    }
    if (pathChange === ".." || item.isDir) {
      try {
          console.log(newPath)
        const files = await entry.adapter.getFiles(newPath);
        dispatch({
          type: ActionTypes.PUSH_FILES,
          files,
          id,
          cwd: newPath
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log(newPath);
      downloadFile(newPath, pathChange, entry.adapter);
    }
  };
}
export function closeConnection(id) {
  return async (dispatch, getState) => {
    const entry = getState().connections.meta.find(c => c.id === id);
    if (!entry) return;
   entry.adapter.close();
   dispatch({type: ActionTypes.REMOVE_CONNECTION, id})
   dispatch({type: ActionTypes.REMOVE_FILES, id})
  };
}
export const readDir = (adapter, id, path) => dispatch => {
    if (path === undefined) {
        //TODO get Home Dir
        path = "/root/";
      }
  return new Promise(async (resolve, reject) => {
      const files = await adapter.getFiles(path);
      dispatch({ type: ActionTypes.PUSH_FILES, files, id, cwd: path });
      resolve();
  });
};
