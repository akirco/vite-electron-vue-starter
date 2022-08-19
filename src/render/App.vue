<script setup lang="ts">
import MainContent from "./layout/main-content.vue";
import btn from "@/components/button/btn.vue";
import topBar from "@/components/titleBar";
import ipcRenderer from "@/utils/ipcRenderer";
import {ref} from "vue";

const val = ref("40px");

function toggleDark() {
  ipcRenderer.invoke<string>("dark-mode:toggle");
}
</script>

<template>
  <!-- 自定义titleBar高度也需要同时设置MainContent的高度值 -->
  <topBar :height="val" title="测试" fontSize="14px"></topBar>
  <MainContent :height="val">
    <btn title="Dark" @click="toggleDark"></btn>
  </MainContent>
</template>

<style scoped></style>
