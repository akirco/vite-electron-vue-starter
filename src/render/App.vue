<script setup lang="ts">
import MainContent from "./layout/main-content.vue";
import topBar from "@/components/titleBar";
import LeftPanel from "./layout/left-panel.vue";
import DragBar from '@/components/dragbar/dragbar.vue'
import { ref } from "vue";
const ml = ref('200px');
const emitFn = (val:boolean)=>{
  val?ml.value=200+'px':ml.value=0+'px';
}

</script>
<template>
  <topBar title="skylight"></topBar>
  <MainContent>
    <div class="grid w-full h-full">
      <LeftPanel ref="panel">
        <DragBar :minWidth="200" dragDir="right" class="top-0" @on-change="emitFn"></DragBar>
      </LeftPanel>
      <div id="root_box">
        <RouterView></RouterView>
      </div>
    </div>
  </MainContent>
</template>
<style scoped>
#root_box {
  margin-left: v-bind(ml);
  transition: all 0.45s;
}
</style>