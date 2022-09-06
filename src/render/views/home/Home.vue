<template>
  <div class="w-full h-full" id="box">
    <div class="bg-lightBgColor dark:bg-PdarkBgColor">

    </div>
    <div class="bg-lightBgColor dark:bg-PdarkBgColor">

    </div>
    <div class="bg-lightBgColor dark:bg-PdarkBgColor">

    </div>
    <div class="bg-lightBgColor dark:bg-PdarkBgColor">

    </div>
    <div class="bg-lightBgColor dark:bg-PdarkBgColor">

    </div>
    <div class="bg-lightBgColor dark:bg-PdarkBgColor">

    </div>
    <div class="bg-lightBgColor dark:bg-PdarkBgColor">

    </div>
    <div class="bg-lightBgColor dark:bg-PdarkBgColor">

    </div>
    <div class="bg-lightBgColor dark:bg-PdarkBgColor">

    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
@import url("@/assets/style/common.css");

#box {
  display: grid;
  grid-template-columns: 33% 33% 33%;
  grid-template-rows: 33% 33% 33%;
}

#box>* {
  margin: 30px;
  padding: 2rem 1.5rem;
  transition: box-shadow 0.3s ease, transform 0.2s ease;
  border-radius: 8px;
  box-shadow: 0 1px 25px rgba(0, 0, 0, 0.2);
}
</style>
