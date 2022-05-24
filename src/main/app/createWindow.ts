import {ipcMain, BrowserWindow, nativeTheme} from "electron";
import path from "path";


const NODE_ENV = process.env.NODE_ENV;

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 971,
        height: 585,
        minWidth: 971,
        minHeight: 585,
        frame: false,
        // resizable: false,
        // opacity: 0.75,
        thickFrame: true,
        hasShadow: true,
        show: false, //启动窗口时隐藏,直到渲染进程加载完成「ready-to-show 监听事件」 再显示窗口,防止加载时闪烁
        icon: path.join(__dirname, '../../.vue/electron.ico'),
        webPreferences: {
            preload: path.join(__dirname, "..", "preload.js"),
            nodeIntegration: true,
            contextIsolation: true,
            webviewTag: true
        },
    });
    console.log(path.join(__dirname))
    // 启动窗口时隐藏,直到渲染进程加载完成「ready-to-show 监听事件」 再显示窗口,防止加载时闪烁
    mainWindow.once("ready-to-show", () => {
        mainWindow.show(); // 显示窗口
    });


    // * 主窗口加载外部链接
    if (NODE_ENV === "development") {
        mainWindow.loadURL("http://localhost:3000/"); // 开发环境,加载vite启动的vue项目地址
        // 打开开发工具
        // mainWindow.webContents.openDevTools();
    }
    if (NODE_ENV !== "development")
        mainWindow.loadFile("dist/.vue/index.html"); // 生产环境加载打包后文件

    // 窗口事件
    ipcMain.handle("dark-mode:toggle", () => {
        if (nativeTheme.shouldUseDarkColors) {
            nativeTheme.themeSource = 'light'

        } else {
            nativeTheme.themeSource = 'dark'
        }
        return nativeTheme.shouldUseDarkColors;
    })

    ipcMain.handle('dark-mode:system', () => {
        nativeTheme.themeSource = 'system'
    })

    ipcMain.on('window-close', function () {
        mainWindow.close();
    })

    ipcMain.handle('window-min-size', function () {
        mainWindow.minimize();
    })

    ipcMain.handle("window-max-size", function () {
        if (mainWindow.isMaximized()) {
            mainWindow.restore();
        } else {
            mainWindow.maximize();
        }
    })
}

export {createWindow};
