import {ipcMain, BrowserWindow, nativeTheme,Menu} from "electron";
import {resize,isFrame} from './common'
import path from "path";

const NODE_ENV = process.env.NODE_ENV;


export async function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1000,
        height: 607,
        minWidth: 1000,
        minHeight: 607,
        frame: isFrame(),
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
    mainWindow.webContents.session.on("select-serial-port",(event, portList, webContents, callback)=>{
        mainWindow.webContents.session.on("serial-port-added",(event,port)=>{
            console.log('serial-port-added FIRED WITH', port)
        })
        mainWindow.webContents.session.on('serial-port-removed', (event, port) => {
            console.log('serial-port-removed FIRED WITH', port)
            //Optionally update portList to remove the port
        })
        event.preventDefault()
        if (portList && portList.length > 0) {
            callback(portList[0].portId)
        } else {
            callback('') //Could not find any matching devices
        }
    })

    // @ts-ignore
    mainWindow.webContents.session.setPermissionCheckHandler((webContents, permission, requestingOrigin, details)=>{
        if(permission==="serial"&&details.securityOrigin==="file:///"){
            return true;
        }
    })

    // @ts-ignore
    mainWindow.webContents.session.setDevicePermissionHandler((details) => {
        if (details.deviceType === 'serial' && details.origin === 'file://') {
            return true
        }
    })



    //根据不同系统选择是否显示Frame
    mainWindow.webContents.on("dom-ready",()=>{
        mainWindow.webContents.send('showFrame', isFrame());
        mainWindow.removeMenu();
    })

    // 启动窗口时隐藏,直到渲染进程加载完成「ready-to-show 监听事件」 再显示窗口,防止加载时闪烁
    mainWindow.once("ready-to-show", () => {
        Menu.setApplicationMenu(Menu.buildFromTemplate([]));
        mainWindow.show(); // 显示窗口
    });

    if (NODE_ENV === "development") {
        // 开发环境,加载vite启动的vue项目地址
        await mainWindow.loadURL("http://localhost:3000/");
        // 打开开发工具
        mainWindow.webContents.openDevTools();
    }
    if (NODE_ENV !== "development")
        // 生产环境加载打包后文件
        await mainWindow.loadFile("dist/.vue/index.html");

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

