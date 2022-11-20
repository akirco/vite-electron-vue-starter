const platform = process.platform;
const ipcRenderer = require("electron").ipcRenderer;
const rootdir = process.cwd();

window.showFrame = platform !== "win32";
window.ipcRenderer = ipcRenderer;
window.rootdir = rootdir;
