<template>
  <div
    class="w-[200px] h-full bg-PlightBgColor dark:bg-PdarkBgColor dark:text-gray-500"
    id="left-panel"
  >
    <div class="item" v-for="item in menuList">
      <RouterLink
        :to="item.path"
        class="w-full h-full block rounded-lg active:bg-gray-700 select-none"
        >{{ item.title }}
      </RouterLink>
    </div>

    <MoonIcon
      class="h-8 w-8 text-gray-800 dark:text-gray-500 cursor-pointer absolute bottom-2 left-2"
      @click="toggleDark"
    />
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, defineComponent } from "vue";
import { MoonIcon } from "@heroicons/vue/outline";
import btn from "@/components/button/btn.vue";
import ipcRenderer from "@/utils/ipcRenderer";
import type { MenuInfo } from "@/types";

export default defineComponent({
  setup() {
    // * data
    const menuList: MenuInfo[] = [
      {
        title: "Home",
        path: "/",
      },
      {
        title: "Tools",
        path: "/tools",
      },
    ];
    const state = reactive({
      count: 0,
      menuList,
    });
    // * functions
    const toggleDark = () => {
      ipcRenderer.invoke<string>("dark-mode:toggle");
    };

    return {
      ...toRefs(state),
      toggleDark,
    };
  },
  components: {
    btn,
    MoonIcon,
  },
});
</script>
<style scoped>
.left-panel {
  display: grid;
}
.item {
  text-align: center;
  font-size: 110%;
  line-height: 48px;
  width: 200px;
  height: 48px;
  user-select: none;
}
.item:hover {
  background-color: #323842;
  cursor: pointer;
}
</style>
