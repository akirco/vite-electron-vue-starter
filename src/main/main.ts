// 控制应用生命周期和创建原生浏览器窗口的模组
import {app, BrowserWindow} from "electron";
import {createWindow} from "./app/createWindow";

app.whenReady().then(() => {
    createWindow();
    //高dpi支持
    if (process.platform === 'win32') {
        app.commandLine.appendSwitch('high-dpi-support', 'true')
        app.commandLine.appendSwitch('force-device-scale-factor', '1')
    }
});


app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

