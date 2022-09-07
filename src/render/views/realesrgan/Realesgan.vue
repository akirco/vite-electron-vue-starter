<template>
  <div class="w-full h-full" id="box">
    <div id="input_enhance" class="p-3">
      <div
        id="select_enhance"
        class="border-2 border-dashed border-dark-50 dark:border-gray-700"
      >
        <div id="select">
          <button class="btn gap-2 btn-accent dark:text-gray-700" @click="selectImage">
            <DocumentIcon class="h-6 w-6" />
            选择图片
          </button>
          <button
            type="button"
            class="btn gap-2 btn-accent dark:text-gray-700"
            :disabled="!imgPathList.length"
            @click="reset"
          >
            <ArrowCircleLeftIcon class="h-6 w-6" />
            清空选择
          </button>
          <button
            @click="selectFolder"
            type="button"
            class="btn gap-2 btn-accent dark:text-gray-700"
          >
            <FolderOpenIcon class="h-6 w-6" />
            选择路径
          </button>
        </div>
        <div class="text-gray-600 grid grid-rows-2">
          <div class="p-4">
            <input
              type="radio"
              id="one"
              v-model="model"
              value="realesrgan-x4plus"
              class="radio radio-primary"
            /><br />
            <label for="one">4k默认</label>
          </div>
          <div class="p-4">
            <input
              type="radio"
              id="two"
              v-model="model"
              value="realesrgan-x4plus-anime"
              class="radio radio-primary"
            /><br />
            <label for="two">4k动漫</label>
          </div>
        </div>
        <div class="w-full h-full text-gray-600">
          <b>处理列表: </b>
          <b>{{ imgPathList.length }} files</b>
          <div v-if="imgPathList.length !== 0">
            <li v-for="item of imgPathList">
              {{ item }}
            </li>
          </div>
          <img
            v-else="imgPathList.length !== 0"
            src="@/assets/icons/empty.svg"
            alt="empty"
            class="w-full h-[157px] select-none"
            draggable="false"
          />
        </div>
      </div>
      <div
        id="operate_enhance"
        class="border-2 border-dashed border-dark-50 dark:border-gray-700"
      >
        <div class="text-gray-700">
          本项目基于:<a
            class="text-gray-900 select-none"
            draggable="false"
            href="https://github.com/xinntao/Real-ESRGAN"
            target="_blank"
            >Real-ESRGAN</a
          >
        </div>
        <div class="flex justify-center items-center">
          <button class="btn gap-2 btn-accent dark:text-gray-700">
            <GiftIcon class="h-6 w-6" />
            开始处理
          </button>
        </div>
      </div>
    </div>
    <div id="preview">
      <div
        class="border-2 border-dashed border-dark-50 dark:border-gray-700 rounded-xl shadow-xl p-2 preimg"
        id="before"
        :style="{ backgroundImage: 'url(atom:///home/meta/Pictures/1.png)' }"
      ></div>
      <div class="p-2 preimg" id="divder"></div>
      <div
        class="border-2 border-dashed border-dark-50 dark:border-gray-700 rounded-xl shadow-xl p-2 preimg"
        id="after"
        :style="{ backgroundImage: 'url(atom:///home/meta/Pictures/1.png)' }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  FolderOpenIcon,
  ArrowCircleLeftIcon,
  DocumentIcon,
  GiftIcon,
} from "@heroicons/vue/outline";
import hook from "@/hooks";
import { ref } from "vue";
const { ipcRenderer } = require("electron");
const imgPathList = ref([]);
const model = ref("realesrgan-x4plus");

const selectImage = async () => {
  const imgPath = await ipcRenderer.invoke("selectImage");
  if (imgPath !== "cancelled") {
    hook.oneWayBackend.setImagePath(imgPath);
    console.log(imgPath);
    imgPathList.value.push(imgPath);
  } else {
    return;
  }
};
const reset = () => {
  imgPathList.value = [];
};

const selectFolder = async () => {
  const path = await ipcRenderer.invoke("selectFolder");
  console.log(path);
  if (path !== "cancelled") {
    hook.oneWayBackend.setOutputPath(path);
  } else {
    console.log("Getting output path from input file");
  }
};
</script>

<style scoped>
#box {
  display: grid;
  grid-template-rows: 30% 70%;
  padding: 10px;
  grid-gap: 5px;
}

#input_enhance {
  padding: 10px;
  grid-gap: 10px;
  grid-template-columns: 80% 20%;
  display: grid;
}

#select_enhance {
  display: grid;
  grid-template-columns: 20% 30% 50%;
  padding: 12px;
  grid-gap: 10px;
}

#select {
  display: grid;
  grid-template-rows: 33% 33% 33%;
  grid-gap: 4px;
}

#operate_enhance {
  display: grid;
  grid-template-rows: 50% 50%;
  grid-gap: 10px;
  padding: 12px;
}

#preview {
  display: grid;
  padding: 20px;
  grid-template-columns: 45% 10% 45%;
  box-sizing: border-box;
}

.preimg {
  width: 100%;
  height: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
