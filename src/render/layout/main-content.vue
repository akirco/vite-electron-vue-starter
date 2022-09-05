<script setup lang="ts">
import platform from "@/utils/showFrame";

defineProps({
  height: {
    type: String,
    default: "35px"
  }
})
</script>

<template>
  <div id="main-content" class="fixed w-full" :style="platform ? {
    top: height,
    height:`calc(100% - ${height})`
  }:{
    top: 0,
    height: `100%`
  }">
    <slot></slot>
  </div>
</template>
