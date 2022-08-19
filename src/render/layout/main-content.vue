<script setup lang="ts">
import {ref} from "vue";
import platform from "@/utils/showFrame";

defineProps({
  height: {
    type: String,
    default: "35px"
  }
})
</script>

<template>
  <div id="main-content"
       class="relative"
       :style=
         "platform ? {
           top: height,
           height:`calc(100% - ${height})`
         }:{
           top: 0,
           height: `100%`
         }">
    <slot></slot>
  </div>
</template>
