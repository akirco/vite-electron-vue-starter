<template>
  <div class="w-[200px] h-full p-[10px] bg-PlightBgColor dark:bg-PdarkBgColor dark:text-gray-500" id="left-panel">
    <div class="item" v-for="item in menuList">
      <RouterLink :to="item.path"
        class="w-[180px] h-full block rounded-lg hover:bg-gray-700 select-none border-0 shadow">
        {{
            item.title
        }}
      </RouterLink>
    </div>
  </div>
</template>

<script lang="ts">
import type { MenuInfo } from "@/types";
import { reactive, toRefs, defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const routes = reactive({
      menuList: [
        {
          title: "Home",
          path: "/",
          icon: "HomeIcon"
        },
        {
          title: "Tools",
          path: "/tools",
          icon: "MinusIcon"
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
.left-panel {
  display: grid;
}

.item {
  text-align: center;
  font-size: 110%;
  line-height: 48px;
  width: 180px;
  height: 48px;
  user-select: none;
}
</style>


