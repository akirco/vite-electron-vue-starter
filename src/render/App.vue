<script setup lang="ts">
import {ref} from 'vue'
import { useFileDialog ,useFullscreen} from '@vueuse/core'
const { files, open, reset } = useFileDialog()

const { isFullscreen, toggle } = useFullscreen()
const element = ref(null)
</script>

<template>
  <div class="flex justify-center flex-col items-center gap-2.5 ">
    <h1>Web Serial API</h1>
    <button id="click" class="group relative w-40 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Test Web Serial API</button>
    <p>Matching Arduino Uno device: <strong id="device-name"></strong></p>
    <button type="button" @click="open()" class="w-40 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
      Choose files
    </button>
    <button
        type="button"
        :disabled="!files"
        @click="reset()"
        class="w-40 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Reset
    </button>
    <template v-if="files">
      <p>You have selected: <b>{{ files.length }} files</b></p>
      <li v-for="file of files" :key="file.name">
        {{ file.name }}
      </li>
    </template>
      <div class="flex" p="y-4">
        <video
            ref="element"
            class="m-auto rounded"
            src="https://vjs.zencdn.net/v/oceans.mp4"
            width="600"
            controls
        />
      </div>
      <button @click="toggle"
              class="w-40 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Go Fullscreen
      </button>
  </div>
</template>

<style>
</style>
