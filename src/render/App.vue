<script setup lang="ts">
import MainContent from "./layout/main-content.vue";
import topBar from "@/components/titleBar";

const ipcRenderer = window.ipcRenderer;
const toggleDark = () => ipcRenderer.invoke("dark-mode:toggle");
</script>

<template>
  <!-- 自定义titleBar高度也需要同时设置MainContent的高度值 -->
  <topBar></topBar>
  <MainContent> </MainContent>
</template>

<style scoped></style>
