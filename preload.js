//预加载进程

const {contextBridge, ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld('selfApi', {
  desktop: true
})

contextBridge.exposeInMainWorld("titleBarAction", {
  close: () => ipcRenderer.invoke("window-close"),
  maxWindow: () => ipcRenderer.invoke("window-max-size"),
  minWindow: () => ipcRenderer.invoke("window-min-size")
})

contextBridge.exposeInMainWorld('darkMode', {
  toggle: () => ipcRenderer.invoke("dark-mode:toggle"),
  system: () => ipcRenderer.invoke("dark-mode:system")
})

//监听dom事件
window.addEventListener("DOMContentLoaded", () => {
  const innerText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element)
      element.innerText = text
  }
  for (const deps of ['chrome', 'node', 'electron']) {
    innerText(`${deps}-version`, process.versions[deps])
  }


})






