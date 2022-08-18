import { BrowserWindow, Menu } from "electron";
import path from "path";
import { toggleDark, windowAction } from "./common";

const NODE_ENV = process.env.NODE_ENV;

async function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 971,
    height: 590,
    minWidth: 971,
    minHeight: 590,
    frame: false,
    thickFrame: true,
    hasShadow: true,
    show: false,
    icon: path.join(__dirname, "..", "..", "/.vue/electron.ico"),
    webPreferences: {
      preload: path.join(__dirname, "..", "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  mainWindow.webContents.on("dom-ready", () => {
    mainWindow.removeMenu();
    Menu.setApplicationMenu(Menu.buildFromTemplate([]));
  });
  mainWindow.once("ready-to-show", async () => {
    await mainWindow.show();
  });
  (async () => {
    if (NODE_ENV === "development") {
      await mainWindow.loadURL("http://localhost:3000/");
      mainWindow.webContents.openDevTools();
    } else {
      await mainWindow.loadFile("dist/.vue/index.html");
    }
  })();
  await windowAction(mainWindow);
  await toggleDark();
}

export { createWindow };
