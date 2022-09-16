import { ipcMain, nativeTheme, dialog } from "electron";
import type { BrowserWindow } from "electron";
import os from 'node:os'

function windowAction(mainWindow: BrowserWindow) {
  // 窗口事件
  ipcMain.on("windowMinSize", () => {
    mainWindow.minimize();
  });
  ipcMain.on("toggleSize", (event) => {
    if (mainWindow.isMaximized()) {
      mainWindow.restore();
    } else {
      mainWindow.maximize();
    }
  });
  ipcMain.on("windowClosed", () => {
    mainWindow.close();
  });

  mainWindow.on("maximize", () => {
    mainWindow.webContents.send("isMaxed", "false");
  });

  mainWindow.on("unmaximize", () => {
    mainWindow.webContents.send("isMaxed", "true");
  });
}

function toggleDark() {
  ipcMain.handle("dark-mode:toggle", () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = "light";
    } else {
      nativeTheme.themeSource = "dark";
    }

    return nativeTheme.shouldUseDarkColors;
  });

  ipcMain.handle("dark-mode:system", () => {
    nativeTheme.themeSource = "system";
  });
}

function RealesganHandler() {
  //* 选择图片
  ipcMain.handle("selectImage", async (event, message) => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      properties: ["openFile"],
      filters: [{ name: `图片`, extensions: ["jpg", "png"] }],
      defaultPath: os.homedir()
    });

    if (canceled) {
      console.log("operation cancelled");
      return "cancelled";
    } else {
      console.log("select img:", filePaths);
      return filePaths[0];
    }
  });

  // * 选择目录
  ipcMain.handle("selectFolder", async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      properties: ["openDirectory"],
    });
    if (canceled) {
      console.log("operation cancelled");
      return "cancelled";
    } else {
      // console.log(filePaths[0]);
      return filePaths[0];
    }
  });

  // * set image path
  ipcMain.on("setImagePath", (_, args: string) => {
    const ext = args.substring(args.lastIndexOf('.'), args.length);
    if (ext === ".jpg" || ext === ".png") {
      console.log("setImagePath:", args);
    } else {
      return
    }
  })

  //* setOutputPath
  ipcMain.on("setOutputPath", (_, args) => {
    console.log(args);
  })

  //* setModel
  ipcMain.on("setModel", (_, args) => {
    console.log(args);
  })

  //* start enhance
  ipcMain.handleOnce("startEhance", (_, args) => {
    console.log(args);
  })
}

function fixed(mainWindow: BrowserWindow) {
  ipcMain.on("fixed", () => {
    mainWindow.setAlwaysOnTop(true, "modal-panel");
  });
}

export { windowAction, toggleDark, RealesganHandler };
