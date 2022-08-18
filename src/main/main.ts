import { app, BrowserWindow } from "electron";
import { createWindow } from "./app/createWindow";

app.whenReady().then(async () => {
  await createWindow();
  //高dpi支持
  if (process.platform === "win32") {
    app.commandLine.appendSwitch("high-dpi-support", "true");
    app.commandLine.appendSwitch("force-device-scale-factor", "1");
  }
});

app.on("activate", async () => {
  if (BrowserWindow.getAllWindows().length === 0) await createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
