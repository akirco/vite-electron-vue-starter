<script setup lang="ts">
import { reactive } from "vue";
import maxIcon from "@/assets/icons/max.svg";
import restoreIcon from "@/assets/icons/restore.svg";

// import { ipcRenderer } from "electron";
//* 也可以使用preload.js contextBridge,但是不能直接操作vue的dom元素

//! 每个btn添加@click事件
const ipcRenderer = require("electron").ipcRenderer;

const icon = reactive({
  srcset: maxIcon,
});
const props = defineProps({
  title: {
    type: String,
    default: "electron-vue-starter",
  },
});
//处理最大化事件修改图标
ipcRenderer.on("isMaxed", (_, state) => {
  // console.log("渲染进程收到的消息是：", state);
  if (state === "false") {
    icon.srcset = restoreIcon;
  }
  if (state === "true") {
    icon.srcset = maxIcon;
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
      icon.srcset = restoreIcon;
    } else if (args === "restore") {
      icon.srcset = maxIcon;
    }
  });
}

function winClosed() {
  ipcRenderer.send("windowClosed", true);
}
</script>

<template>
  <div
    class="h-[35px] w-full text-gray-500 fixed border-b-[1.0px] border-b-selfBorder"
  >
    <div id="drag-region" class="w-full h-full grid grid-cols-[138px]">
      <div class="grid-cols-1 flex items-center justify-center">
        <span
          class="overflow-hidden whitespace-nowrap leading-[1.5] text-ellipsis font-sans text-xs"
        >
          {{ props.title }}
        </span>
      </div>
      <div
        id="window-controls"
        class="grid absolute top-0 right-0 h-full select-none"
      >
        <div
          class="flex justify-center items-center h-full w-full select-none hover:bg-gray-600 active:bg-zinc-500"
          @click="winMinSize"
        >
          <img
            class="icon"
            srcset="../assets/icons/min.svg 2.5x"
            draggable="false"
          />
        </div>
        <div
          class="flex justify-center items-center h-full w-full select-none hover:bg-gray-600 active:bg-zinc-500"
          @click="toggleSize"
        >
          <img
            class="icon"
            :srcset="icon.srcset + ' ' + '2.5x'"
            draggable="false"
          />
        </div>

        <div
          class="flex justify-center items-center h-full w-full select-none hover:bg-red-500 active:bg-red-200"
          @click="winClosed"
        >
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
@import url("../assets/style/titlebar.css");
</style>
