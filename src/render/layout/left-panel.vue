<template>
  <div class="w-[200px] h-full p-[10px] bg-PlightBgColor dark:bg-PdarkBgColor dark:text-gray-500" id="left-panel">
    <RouterLink draggable="false" id="item" :to="item.path" active-class="active"
      class="w-[180px] h-full block select-none border-none   hover:bg-light-700 hover:shadow-lg rounded mb-4 bg-selfBgColor"
      v-for="item in menuList">
      {{ item.title }}
    </RouterLink>
  </div>
</template>

<script lang="ts">
import type { MenuInfo } from "@/types";
import { reactive, toRefs, defineComponent, } from 'vue'

export default defineComponent({
  setup() {
    const routes = reactive({
      menuList: [
        {
          title: "首页",
          path: "/",
        },
        {
          title: "哔哩哔哩",
          path: "/bilidown",
        },
        {
          title: "画质增强",
          path: "/tools",
        },
        {
          title: "待办事项",
          path: "/todos",
        },
      ] as MenuInfo[],
    });
    return {
      ...toRefs(routes),
    }
  },
})
</script>
<style scoped>
@import url('@/assets/style/leftPanel.css');
</style>


