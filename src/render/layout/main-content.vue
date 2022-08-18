<script setup lang="ts">
defineProps({
  height:{
    type:String,
    default:"35px"
  }
})
</script>

<template>
  <div id="main-content"
       class="relative"
       :style="{top:height,height:`calc(100% - ${height})`}">
    <slot></slot>
  </div>
</template>
