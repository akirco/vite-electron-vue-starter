import path from "path";
import { BrowserWindowConstructorOptions } from "electron";

const showFrame = process.platform === "win32" ? false : true;

export const windowConfig: BrowserWindowConstructorOptions = {
  width: 1150,
  height: 750,
  minWidth: 1150,
  minHeight: 750,
  frame: showFrame,
  thickFrame: true,
  hasShadow: true,
  // resizable: false,
  autoHideMenuBar: true,
  show: false,
  icon: path.join(__dirname, "..", "..", "/.vue/electron.ico"),
  webPreferences: {
    nodeIntegration: true,
    contextIsolation: false,
  },
};
