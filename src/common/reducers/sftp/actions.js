import * as ActionTypes from "./actionTypes";
import { downloadFile } from "../../Download";
const Client = window.require("ssh2").Client;
const fs = window.require("fs");

export function addSftpConnection(config) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      const id = getState().sftp.connections.length;
      const conn = new Client();
      conn
        .on("ready", function() {
          conn.sftp(function(err, sftp) {
            if (err) {
              reject(err);
              return;
            }
            sftp.readdir("/root/", function(err, list) {
              if (err) {
                reject(err);
                return;
              }

              dispatch({
                type: ActionTypes.ADD_CONNECTION,
                sftp,
                id,
                list,
                conn,
                path: "/root/"
              });
              resolve(id);
            });
          });
        })
        .connect(config);
    });
  };
}
export function updateDir(id, pathChange, item) {
  return (dispatch, getState) => {
    const entry = getState().sftp.connections[id];
    if (!entry) return;
    console.log(entry);
    let newPath;
    if (pathChange === "..") {
      const split = entry.path.split("/");
      newPath = `${split.splice(0, split.length - 2).join("/")}/`;
    } else {
      if (item.isDir) newPath = `${entry.path}${pathChange}/`;
      else newPath = `${entry.path}${pathChange}`;
    }
    if (pathChange === ".." || item.isDir) {
      entry.sftp.readdir(newPath, function(err, list) {
        if (err) {
          return;
        }
        dispatch({
          type: ActionTypes.UPDATE_FOLDER,
          list,
          id,
          path: newPath
        });
      });
    } else {
      downloadFile(newPath, pathChange, entry.sftp);
    }
  };
}
export function setCurrentActive(id) {
  return dispatch => {
    dispatch({ type: ActionTypes.UPDATE_ACTIVE, id });
  };
}
export function uploadFiles(files, id) {
  return (dispatch, getState) => {
    const entry = getState().sftp.connections[id];
    if (!entry) return;
    for(let file of files){
       const promise = new Promise((resolve) => {
        const remotePath = entry.path + file.name;
        const readStream = fs.createReadStream( file.path );
        const writeStream = entry.sftp.createWriteStream( remotePath);
        writeStream.on('close',function () {
            console.log(file.name, "uploaded");
           resolve();
        });
        readStream.pipe( writeStream );
       });
       promise.then(() => {
        entry.sftp.readdir(entry.path, function(err, list) {
            if (err) {
              return;
            }
            dispatch({
              type: ActionTypes.UPDATE_FOLDER,
              list,
              id,
              path: entry.path
            });
          });
       })
    }
  };
}
export function createDirectory(dirName, id) {
  return (dispatch, getState) => {
    const entry = getState().sftp.connections[id];
    if (!entry) return;
   
    entry.sftp.mkdir(entry.path + dirName, (err, result) => {
        entry.sftp.readdir(entry.path, function(err, list) {
            if (err) {
              return;
            }
            dispatch({
              type: ActionTypes.UPDATE_FOLDER,
              list,
              id,
              path: entry.path
            });
          });
    })
  };
}
