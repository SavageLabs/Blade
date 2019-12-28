import fileMapper from "./FileMapper";
const Client = window.require("electron").remote.require("ssh2").Client;
class Sftp {
  constructor(config) {
    this.config = config;
    this.connected = false;
    this.ready = false;
  }
  download(remotePath, localPath) {
    return new Promise((resolve, reject) => {
        if (!this.ready || !this.connected || !this.sftp) {
          reject("Not connected");
          return;
        }
        this.sftp.fastGet(remotePath, localPath, {}, err => {
            if (err){
                reject(err);
                return;
            }
            resolve();
          });
      });
  }
  close() {
    if (!this.ready || !this.connected || !this.sftp) {
        return;
      }
      this.sftp.end();
      delete this.sftp;
      this.ready = false;
      this.connected = false;
  }
  connect() {
    return new Promise((resolve, reject) => {
      const connection = new Client();
      connection
        .on("ready", () => {
          this.connected = true;
          connection.sftp((err, sftp) => {
            if (err) {
              //   dispatch({type: ActionTypes.EDIT_CONNECTION, id, data: { state: "failed", error: err}});
              reject(err);
              return;
            }
            this.ready = true;
            this.sftp = sftp;
            resolve();
          });
        })
        .connect(this.config);
    });
  }
  getFiles(path) {
    return new Promise((resolve, reject) => {
      if (!this.ready || !this.connected || !this.sftp) {
        reject("Not connected");
        return;
      }
      this.sftp.readdir(path, (err, files) => {
        if (err) {
          reject(err);
          return;
        }
        const mapped = fileMapper("sftp", files, path === "/");
        resolve(mapped);
      });
    });
  }
}
export default Sftp;
