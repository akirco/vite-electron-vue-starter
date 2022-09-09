<template>
  <div id="box" class=" h-full w-full">
    <div>
      <ul class="menu w-[180px] p-2 h-full bg-lightChildNavBg rounded-r-2xl dark:bg-base-100 dark:text-gray-700">
        <li>
          <router-link draggable="false" to="/downloader/predownload" active-class="child_active">
            <HomeIcon class="w-5 h-5" />
            视频解析
          </router-link>
        </li>
        <li>
          <router-link draggable="false" to="/downloader/downloads" active-class="child_active">
            <DownloadIcon class="h-5 w-5" />
            下载管理
          </router-link>
        </li>
        <li>
          <router-link draggable="false" to="/downloader/files" active-class="child_active">
            <FilmIcon class="h-5 w-5" />文件管理
          </router-link>
        </li>
        <li>
          <router-link draggable="false" to="/downloader/settings" active-class="child_active">
            <CakeIcon class="h-5 w-5" /> 程序设置
          </router-link>
        </li>
      </ul>
    </div>
    <!-- 导航结束 -->
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  HomeIcon,
  DownloadIcon,
  FilmIcon,
  CakeIcon,
} from "@heroicons/vue/outline";
</script>

<style scoped>
@import url("@/assets/style/common.css");

#box {
  display: grid;
  grid-template-columns: 20% 80%;
}
</style>
