import type { BrowserWindow } from 'electron';
import { ipcMain, nativeTheme } from 'electron';

function windowAction(mainWindow: BrowserWindow) {
  ipcMain.on('windowMinSize', () => {
    mainWindow.minimize();
  });
  ipcMain.on('toggleSize', (event) => {
    if (mainWindow.isMaximized()) {
      mainWindow.restore();
    } else {
      mainWindow.maximize();
    }
  });
  ipcMain.on('windowClosed', () => {
    mainWindow.close();
  });

  mainWindow.on('maximize', () => {
    mainWindow.webContents.send('isMaxed', 'false');
  });

  mainWindow.on('unmaximize', () => {
    mainWindow.webContents.send('isMaxed', 'true');
  });
}

function toggleDark() {
  ipcMain.handle('dark-mode:toggle', () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = 'light';
    } else {
      nativeTheme.themeSource = 'dark';
    }
    return nativeTheme.shouldUseDarkColors;
  });

  ipcMain.handle('dark-mode:system', () => {
    nativeTheme.themeSource = 'system';
  });
}

export { windowAction, toggleDark };
