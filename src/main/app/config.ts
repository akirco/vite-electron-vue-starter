import path from "path";
import { BrowserWindowConstructorOptions } from "electron";

const platform = process.platform;



export const windowConfig: BrowserWindowConstructorOptions = {
  width: 971,
  height: 590,
  minWidth: 971,
  minHeight: 590,
  frame: platform === "win32",
  thickFrame: true,
  hasShadow: true,
  show: false,
  icon: path.join(__dirname, "..", "..", "/.vue/electron.ico"),
  webPreferences: {
    preload: path.join(__dirname, "..", "preload.js"),
    nodeIntegration: true,
    contextIsolation: false,
  },
};
