<script setup lang="ts">
import {reactive} from "vue";
import max_srcset from "../assets/icons/max.svg"
import restore_srcset from "../assets/icons/restore.svg"

// import { ipcRenderer } from "electron";
//* 也可以使用preload.js contextBridge,但是不能直接操作vue的dom元素

//! 每个btn添加@click事件
const ipcRenderer = require("electron").ipcRenderer;

const refObj = reactive({
  srcset: max_srcset,
});
const props = defineProps({
  title: {
    type: String,
    default: "electron-vue-starter"
  }
})
//处理最大化事件修改图标
ipcRenderer.on("isMaxed", (_, state) => {
  // console.log("渲染进程收到的消息是：", state);
  if (state === "false") {
    refObj.srcset = restore_srcset;
  }
  if (state === "true") {
    refObj.srcset = max_srcset;
  }
});

function winMinSize(): void {
  ipcRenderer.send("windowMinSize", true);
}

function toggleSize() {
  ipcRenderer.send("toggleSize", true);
  ipcRenderer.on("winState", (event, args) => {
    // console.log("渲染进程收到的消息是：", args);
    if (args === "maximize") {
      refObj.srcset = restore_srcset;
    } else if (args === "restore") {
      refObj.srcset = max_srcset;
    }
  });
}

function winClosed() {
  ipcRenderer.send("windowClosed", true);
}
</script>

<template>
  <div id="titlebar">
    <div id="drag-region">
      <div id="window-title">
        <span>{{ props.title }}</span>
      </div>
      <div id="window-controls">
        <div class="button" id="min-button" @click="winMinSize">
          <img
              class="icon"
              srcset="../assets/icons/min.svg 2.5x"
              draggable="false"
          />
        </div>

        <div class="button" id="max-button" @click="toggleSize">
          <img class="icon" :srcset="refObj.srcset + ' '+'2.5x'" draggable="false"/>
        </div>

        <div class="button" id="close-button" @click="winClosed">
          <img
              class="icon"
              srcset="../assets/icons/closed.svg 1.75x"
              draggable="false"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#titlebar {
  position: fixed;
  height: 35px;
  width: 100%;
  background: #171c26;
  color: #828997;
}

#titlebar #drag-region {
  width: 100%;
  height: 100%;
  -webkit-app-region: drag;
  display: grid;
  grid-template-columns: auto 138px;
}

#window-controls {
  display: grid;
  grid-template-columns: repeat(3, 50px);
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  -webkit-app-region: no-drag;
}

#window-controls .button {
  grid-row: 1 / span 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  user-select: none;
}

#window-controls .button:hover {
  background: rgba(255, 255, 255, 0.1);
}

#window-controls .button:active {
  background: rgba(255, 255, 255, 0.2);
}

#close-button:hover {
  background: #a52d37 !important;
}

#close-button:active {
  background: #f1707a !important;
}

#close-button:active .icon {
  filter: invert(1);
}

#min-button {
  grid-column: 1;
}

#close-button {
  grid-column: 3;
}

@media (-webkit-device-pixel-ratio: 1.5),
(device-pixel-ratio: 1.5),
(-webkit-device-pixel-ratio: 2),
(device-pixel-ratio: 2),
(-webkit-device-pixel-ratio: 3),
(device-pixel-ratio: 3) {
  #window-controls .icon {
    width: 10px;
    height: 10px;
  }
}

#window-title {
  grid-column: 1;
  display: flex;
  align-items: center;
  margin-left: 8px;
  overflow: hidden;
  font-family: "Segoe UI", sans-serif;
  font-size: 12px;
  padding-left: 8px;
}

#window-title span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.5;
}

.maximized #titlebar {
  width: 100%;
  padding: 0;
}

.maximized #window-title {
  margin-left: 12px;
}
</style>
