<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import TitleBar from "./layout/title-bar.vue";
import MainContent from "./layout/main-content.vue";
</script>

<template>
  <div id="app-content">
    <TitleBar></TitleBar>
    <MainContent></MainContent>
  </div>
</template>

<style>
#app-content {
  margin: 0;
  padding: 0;
  width: 100%;;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
</style>
