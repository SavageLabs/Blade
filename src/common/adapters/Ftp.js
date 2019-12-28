import fileMapper from "./FileMapper";
const Client = window.require("electron").remote.require("ftp");
class Sftp {
  constructor(config) {
    this.config = config;
    this.connected = false;
    this.ready = false;
  }
  download(remotePath, localPath) {
    return new Promise((resolve, reject) => {
      
      });
  }
  connect() {
    return new Promise((resolve, reject) => {
      const connection = new Client();
    });
  }
  readCurrrentDir() {
    return new Promise((resolve, reject) => {});
  }
  updateAndRead(path) {
    return new Promise((resolve, reject) => {});
  }
  getFiles(path) {
    if (!path) return this.readCurrrentDir();
    return this.updateAndRead(path);
  }
}
export default Sftp;
