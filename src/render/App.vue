<script setup lang="ts">
import TitleBar from "./layout/title-bar.vue";
import MainContent from "./layout/main-content.vue";
function toogleTheme() {
  const body = document.querySelector("#app");
  body?.classList.toggle("dark");
}
</script>

<template>
  <TitleBar title="electron-starter"></TitleBar>
  <MainContent class="dark:bg-selfBgColor">
    <div class="flex items-center pt-4 pl-4">
      <button
        @click="toogleTheme"
        class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        toogleTheme
      </button>
    </div>
  </MainContent>
</template>

<style></style>
