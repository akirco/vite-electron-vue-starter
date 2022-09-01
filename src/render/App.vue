<script setup lang="ts">
import MainContent from "./layout/main-content.vue";
import topBar from "@/components/titleBar";
import LeftPanel from "./layout/left-panel.vue";
</script>

<template>
  <topBar></topBar>
  <MainContent>
    <div class="flex h-full w-full">
      <LeftPanel></LeftPanel>
    </div>
  </MainContent>
</template>
