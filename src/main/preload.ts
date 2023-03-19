const platform = process.platform;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ipcRenderer = require('electron').ipcRenderer;
const rootdir = process.cwd();

window.showFrame = platform !== 'win32';
window.ipcRenderer = ipcRenderer;
window.rootdir = rootdir;
