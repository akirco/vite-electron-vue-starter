<template>
  <div class="w-full h-full" id="box_enhance">
    <div id="input_enhance" class="p-3">
      <div id="select_enhance" class="border-2 border-dashed border-dark-50 dark:border-gray-700">
        <div id="select">
          <button class="btn gap-2 btn-accent dark:text-gray-700" @click="selectImage">
            <DocumentIcon class="h-6 w-6" />
            选择图片
          </button>
          <button type="button" class="btn gap-2 btn-accent dark:text-gray-700" :disabled="!imgPathList.length"
            @click="reset">
            <ArrowCircleLeftIcon class="h-6 w-6" />
            清空选择
          </button>
          <button @click="selectFolder" type="button" class="btn gap-2 btn-accent dark:text-gray-700">
            <FolderOpenIcon class="h-6 w-6" />
            选择路径
          </button>
        </div>
        <div>
          <input type="radio" name="radio-2" class="radio radio-primary" checked />
          <input type="radio" name="radio-2" class="radio radio-primary" />
        </div>
        <div class="w-full h-full">
          <b class="text-gray-700">处理列表: </b>
          <b class="text-gray-600">{{ imgPathList.length }} files</b>
          <div v-if="imgPathList.length!==0">
            <li v-for="item of imgPathList">
              {{ item }}
            </li>
          </div>
          <img v-else="imgPathList.length!==0" src="@/assets/icons/empty.svg" alt="empty"
            class="w-full h-[157px] select-none" draggable="false">
        </div>
      </div>
      <div id="operate_enhance" class="border-2 border-dashed border-dark-50 dark:border-gray-700">
        <div class="text-gray-700">
          本项目基于:<a class="text-gray-900 select-none" draggable="false" href="https://github.com/xinntao/Real-ESRGAN"
            target="_blank">Real-ESRGAN</a>
        </div>
        <div class="flex justify-center items-center">
          <button class="btn gap-2 btn-accent dark:text-gray-700 ">
            <GiftIcon class="h-6 w-6" />
            开始处理
          </button>
        </div>
      </div>
    </div>
    <div id="preview">2</div>
  </div>
</template>

<script setup lang="ts">
import { FolderOpenIcon, ArrowCircleLeftIcon, DocumentIcon, GiftIcon } from '@heroicons/vue/outline'
import hook from '@/hooks'
import { ref } from 'vue';
const { ipcRenderer } = require('electron')
const imgPathList = ref([])


const selectImage = async () => {
  const imgPath = await ipcRenderer.invoke("selectImage")
  console.log(imgPath);
  imgPathList.value.push(imgPath)
}
const reset = () => {
  imgPathList.value = [];
}


const selectFolder = async () => {
  const path = await ipcRenderer.invoke("selectFolder")
  console.log(path);
  if (path !== "cancelled") {
    hook.oneWayBackend.setPath(path);
  } else {
    console.log("Getting output path from input file");
  }
}
</script>

<style scoped>
#box_enhance {
  display: grid;
  grid-template-rows: 30% 70%;
  padding: 10px;
  grid-gap: 10px;
}

#input_enhance {
  padding: 12px;
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
  padding: 12px;
}
</style>
