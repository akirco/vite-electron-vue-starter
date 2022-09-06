import { ipcMain, nativeTheme, dialog } from "electron";
import type { BrowserWindow } from "electron";

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
    });

    if (canceled) {
      console.log("operation cancelled");
      return "cancelled";
    } else {
      console.log(filePaths[0]);
      return filePaths[0];
    }
  });

  // * 选择目录
  ipcMain.handle("selectFolder", async (event, message) => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      properties: ["openDirectory"],
    });
    if (canceled) {
      console.log("operation cancelled");
      return "cancelled";
    } else {
      console.log(filePaths[0]);
      return filePaths[0];
    }
  });
}

function fixed(mainWindow: BrowserWindow) {
  ipcMain.on("fixed", () => {
    mainWindow.setAlwaysOnTop(true, "modal-panel");
  });
}

export { windowAction, toggleDark, RealesganHandler };
