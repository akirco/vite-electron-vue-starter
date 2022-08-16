import {app, BrowserWindow,session} from "electron";
import {createWindow} from "./app/createWindow";
import path from "path";

app.whenReady().then(async () => {
    await createWindow();
    //load vue-devTools
    const vueDevToolsPath = path.join(__dirname,'../..','devtools')
    // await session.defaultSession.loadExtension(vueDevToolsPath);
    //高dpi支持
    if (process.platform === 'win32') {
        app.commandLine.appendSwitch('high-dpi-support', 'true')
        app.commandLine.appendSwitch('force-device-scale-factor', '1')
    }
});

app.on("activate",  async ()=>{
    if (BrowserWindow.getAllWindows().length === 0)
        await createWindow();
});

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此，通常对程序和它们在
// 任务栏上的图标来说，应当保持活跃状态，直到用户使用 Cmd + Q 退出。
app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        app.quit();
    }
});