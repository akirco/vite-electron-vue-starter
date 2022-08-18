<script setup lang="ts">
import {onMounted, ref} from "vue";
import maxIcon from "@/assets/icons/max.svg";
import restoreIcon from "@/assets/icons/restore.svg";
import ipcRenderer from "@/utils/ipcRenderer";
const Icon = ref(maxIcon);
defineProps({
  title: {
    type: String,
    default: "electron-vue-starter",
  },
  height: {
    type: String,
    default: "35px"
  },
  fontSize:{
    type:String,
    default:"12px"
  }
});

onMounted(() => {
  ipcRenderer.on("isMaxed", (_e, state) => {
    // console.log("渲染进程收到的消息是：", state);
    if (state === "false") {
      Icon.value = restoreIcon;
    }
    if (state === "true") {
      Icon.value = maxIcon;
    }
  });
});

function winMinSize(): void {
  ipcRenderer.send("windowMinSize", true);
}

function toggleSize() {
  ipcRenderer.send("toggleSize", true);
  ipcRenderer.on("winState", (event, args) => {
    // console.log("渲染进程收到的消息是：", args);
    if (args === "maximize") {
      Icon.value = restoreIcon;
    } else if (args === "restore") {
      Icon.value = maxIcon;
    }
  });
}

function winClosed() {
  ipcRenderer.send("windowClosed", true);
}
</script>

<template>
  <div
    :style="{height:height}"
    class="w-full text-gray-500 fixed border-b-[1px] border-b-light-400 bg-gray-50 dark:bg-selfBgColor dark:border-b-selfBorder"
  >
    <div id="drag-region" class="w-full h-full grid grid-cols-[138px]">
      <div class="grid-cols-1 flex items-center pl-2">
        <span
          :style="{fontSize:fontSize}"
          class="whitespace-nowrap leading-[1.5] text-ellipsis font-sans text-xs"
        >
          {{ title }}
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
            srcset="../../assets/icons/min.svg 2.5x"
            draggable="false"
          />
        </div>
        <div
          class="flex justify-center items-center h-full w-full select-none hover:bg-gray-600 active:bg-zinc-500"
          @click="toggleSize"
        >
          <img
            class="icon"
            :srcset="Icon + ' ' + '2.5x'"
            draggable="false"
          />
        </div>

        <div
          class="flex justify-center items-center h-full w-full select-none hover:bg-red-500 active:bg-red-200"
          @click="winClosed"
        >
          <img
            class="icon"
            srcset="../../assets/icons/closed.svg 1.75x"
            draggable="false"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("../../assets/style/titlebar.css");
</style>
