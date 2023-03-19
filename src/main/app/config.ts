import { BrowserWindowConstructorOptions } from 'electron';
import path from 'path';

const platform = process.platform;

export const windowConfig: BrowserWindowConstructorOptions = {
  width: 990,
  height: 650,
  frame: platform !== 'win32',
  hasShadow: true,
  show: false,
  icon: path.join(__dirname, '..', '..', '/.render/electron.ico'),
  webPreferences: {
    preload: path.join(__dirname, '..', 'preload.js'),
    nodeIntegration: true,
    contextIsolation: false,
  },
};
