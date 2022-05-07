//主进程
const {app, BrowserWindow, BrowserView, ipcRenderer, ipcMain, nativeTheme} = require('electron')
const path = require('path')


function createWindow() {
  //定义窗口属性

//创建窗口实例
  let mainWindow = new BrowserWindow({
    width: 971,
    height: 581,
    frame: false,
    show: false,
    backgroundColor: '#ffffff', //官方建议设置接近应用程序的背景色，使应用显得更原生
    // paintWhenInitiallyHidden: true,//此设置为false,始终不显示窗口
    center: true,
    useContentSize: true,//web页面的尺寸
    opacity: 0.98,
    webPreferences: {
      contextIsolation: true, // default in Electron >= 12
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  //子窗口，且子窗口总是显示在顶部
  // let childWindow = new BrowserWindow({parent: mainWindow})

  //模态窗口
  // let child = new BrowserWindow({parent: mainWindow, modal: true, show: false})
  // child.loadURL('https://github.com')
  // child.once('ready-to-show', () => {
  //   child.show()
  // })


  //窗口加载文件
  mainWindow.loadFile('index.html')
  //开启开发者工具
  // mainWindow.webContents.openDevTools()

  //该功能待查看文档
  // mainWindow.once('focus', () => mainWindow.flashFrame(false))
  // mainWindow.flashFrame(true)


  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
    // childWindow.show()
  })

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


//初始化
app.whenReady().then(() => {
  createWindow();
  //高dpi支持
  if (process.platform === 'win32') {
    app.commandLine.appendSwitch('high-dpi-support', 'true')
    app.commandLine.appendSwitch('force-device-scale-factor', '1')
  }
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0)
      createWindow();
  })
})


//关闭
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
