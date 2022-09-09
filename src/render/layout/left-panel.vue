<template>
  <div
    class="absolute left-0 rounded-r-2xl w-[200px] h-full p-3  bg-lightBgColor dark:bg-PdarkBgColor dark:text-gray-500"
    id="left-panel">
    <RouterLink draggable="false" id="item" :to="item.path" active-class="active"
      class="rounded-xl w-[180px] h-full block select-none border-none bg-PlightBgColor shadow hover:bg-light-700 hover:shadow-lg mb-4 dark:bg-selfBgColor"
      v-for="item in menuList">
      {{ item.title }}
    </RouterLink>
    <div class="absolute bottom-3 left-3 cursor-pointer">
      <SunIcon v-if="isDark" @click="toggleDark" class="w-8 h-8" />
      <MoonIcon v-else="isDark" @click="toggleDark" class="w-8 h-8" />
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts">

import type { MenuInfo } from "@/types";
import {
  reactive,
  toRefs,
  defineComponent,
  ref,
  onMounted,

} from "vue";
import ipcRenderer from "@/utils/ipcRenderer";
import { SunIcon, MoonIcon } from "@heroicons/vue/outline";

export default defineComponent({
  setup() {
    const state = reactive({
      menuList: [
        {
          title: "All tools",
          path: "/",
        },
        {
          title: "Downloader",
          path: "/downloader",
        },
        {
          title: "Realesgan",
          path: "/realesgan",
        },
        {
          title: "Todolist",
          path: "/todos",
        },
        // {
        //   title: "Compress",
        //   path: "/compress",
        // },
      ] as MenuInfo[],
    });
    const isDark = ref(null);
    onMounted(() => {
      const isDarkMode =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      isDark.value = isDarkMode;
    });
    function toggleDark() {
      isDark.value = !isDark.value;
      ipcRenderer.invoke<string>("dark-mode:toggle");
    }


    return {
      ...toRefs(state),
      toggleDark,
      isDark,
    };
  },
  components: {
    SunIcon,
    MoonIcon,
  },
});
</script>
<style scoped>
@import url("@/assets/style/leftPanel.css");
</style>
