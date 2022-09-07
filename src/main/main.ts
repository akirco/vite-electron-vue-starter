import { app, BrowserWindow, session, protocol } from "electron";
import InitWindow from "./app/createWindow";
import path from 'path';

async function loadDevtools() {
  const NODE_ENV = process.env.NODE_ENV;
  if (NODE_ENV === "development") {
    const { VUEJS3_DEVTOOLS } = require('electron-devtools-vendor');
    await session.defaultSession.loadExtension(VUEJS3_DEVTOOLS, {
      allowFileAccess: true,
    });
    console.log("install vue-devtools sucess!");
  }
}

async function RegisterProtocol() {
  protocol.registerFileProtocol('atom', (request, callback) => {
    const url = request.url.substr(7)
    callback(decodeURI(path.normalize(url)))
  })
}



async function appReady() {
  await RegisterProtocol()
  // await loadDevtools();
  await new InitWindow().createWindow();
  //high dpi support
  if (process.platform === "win32") {
    app.commandLine.appendSwitch("high-dpi-support", "true");
    app.commandLine.appendSwitch("force-device-scale-factor", "1");
  }
}

app.whenReady().then(appReady);

app.on("activate", async () => {
  if (BrowserWindow.getAllWindows().length === 0) await appReady();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
