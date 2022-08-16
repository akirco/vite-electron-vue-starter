const {contextBridge, ipcRenderer} = require('electron')

//隔离上下文
contextBridge.exposeInMainWorld('selfApi', {
    window
})

//暴露titleBar行为给主进程
contextBridge.exposeInMainWorld("titleBarAction", {
    close: () => ipcRenderer.invoke("window-close"),
    maxWindow: () => ipcRenderer.invoke("window-max-size"),
    minWindow: () => ipcRenderer.invoke("window-min-size")
})

//暴露toggleTheme行为给主进程
contextBridge.exposeInMainWorld('darkMode', {
    toggle: () => ipcRenderer.invoke("dark-mode:toggle"),
    system: () => ipcRenderer.invoke("dark-mode:system")
})


//监听dom事件
window.addEventListener("DOMContentLoaded", () => {
    const titleBar = document.getElementById('titleBar')
    const main = document.getElementById('main');
    //监听ipcMain的showFrame事件
    ipcRenderer.on('showFrame', (_event, value) => {
        if (value) {
            titleBar!.remove();
            main!.style.height = "100%";
        }
    })
})

// @ts-ignore
window.addEventListener("beforeunload",()=>{
    window.onkeydown=(e)=>{
        let ctrl = e.ctrlKey;
        let r = e.key
        if(ctrl&& r==="control"){
            return false;
        }
    }
})



