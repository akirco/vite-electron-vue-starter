<template>
  <div class="w-full" id="box">
    <div class="bg-lightBgColor dark:bg-PdarkBgColor">
      <div class="card_load"></div>
      <div class="card_load_extreme_title"></div>
      <div class="card_load_extreme_descripion"></div>
    </div>
    <div class="bg-lightBgColor dark:bg-PdarkBgColor">
      <div class="card_load"></div>
      <div class="card_load_extreme_title"></div>
      <div class="card_load_extreme_descripion"></div>
    </div>
    <div class="bg-lightBgColor dark:bg-PdarkBgColor">
      <div class="card_load"></div>
      <div class="card_load_extreme_title"></div>
      <div class="card_load_extreme_descripion"></div>
    </div>
    <div class="bg-lightBgColor dark:bg-PdarkBgColor">
      <div class="card_load"></div>
      <div class="card_load_extreme_title"></div>
      <div class="card_load_extreme_descripion"></div>
    </div>
    <div class="bg-lightBgColor dark:bg-PdarkBgColor">
      <div class="card_load"></div>
      <div class="card_load_extreme_title"></div>
      <div class="card_load_extreme_descripion"></div>
    </div>
    <div class="bg-lightBgColor dark:bg-PdarkBgColor">
      <div class="card_load"></div>
      <div class="card_load_extreme_title"></div>
      <div class="card_load_extreme_descripion"></div>
    </div>
    <div class="bg-lightBgColor dark:bg-PdarkBgColor">
      <div class="card_load"></div>
      <div class="card_load_extreme_title"></div>
      <div class="card_load_extreme_descripion"></div>
    </div>
    <div class="bg-lightBgColor dark:bg-PdarkBgColor">
      <div class="card_load"></div>
      <div class="card_load_extreme_title"></div>
      <div class="card_load_extreme_descripion"></div>
    </div>
    <div class="bg-lightBgColor dark:bg-PdarkBgColor">
      <div class="card_load"></div>
      <div class="card_load_extreme_title"></div>
      <div class="card_load_extreme_descripion"></div>
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
#box > * {
  margin: 30px;
  padding: 2rem 1.5rem;
  transition: box-shadow 0.3s ease, transform 0.2s ease;
  border-radius: 8px;
  box-shadow: 0 1px 25px rgba(0, 0, 0, 0.2);
}
.card_load {
  width: 70px;
  height: 70px;
  position: relative;
  float: left;
  background: linear-gradient(
    120deg,
    #e5e5e5 30%,
    #f0f0f0 38%,
    #f0f0f0 40%,
    #e5e5e5 48%
  );
  border-radius: 50%;
  background-size: 200% 100%;
  background-position: 100% 0;
  animation: load89234 2s infinite;
}
.card_load_extreme_title {
  width: 90px;
  height: 20px;
  position: relative;
  float: right;
  border-radius: 5px;
  background: linear-gradient(
    120deg,
    #e5e5e5 30%,
    #f0f0f0 38%,
    #f0f0f0 40%,
    #e5e5e5 48%
  );
  background-size: 200% 100%;
  background-position: 100% 0;
  animation: load89234 2s infinite;
}

.card_load_extreme_descripion {
  width: 90px;
  height: 80px;
  position: relative;
  float: right;
  border-radius: 5px;
  background: linear-gradient(
    120deg,
    #e5e5e5 30%,
    #f0f0f0 38%,
    #f0f0f0 40%,
    #e5e5e5 48%
  );
  margin-top: 10px;
  background-size: 200% 100%;
  background-position: 100% 0;
}
</style>
