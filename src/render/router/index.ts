import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/home/Home.vue";
import Realesgan from "@/views/realesrgan/Realesgan.vue";
import Bili from "@/views/bilibili/Bilidown.vue";
import Todos from "@/views/todos/Todos.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/realesgan",
      component: Realesgan,
    },
    {
      path: "/bilidown",
      component: Bili,
      children: [
        {
          path: "/bilidown/predownload",
          component: () => import("@/views/bilibili/child/predownload.vue"),
        },
        {
          path: "/bilidown/downloads",
          component: () => import("@/views/bilibili/child/downloads.vue"),
        },
        {
          path: "/bilidown/files",
          component: () => import("@/views/bilibili/child/files.vue"),
        },
        {
          path: "/bilidown/settings",
          component: () => import("@/views/bilibili/child/settings.vue"),
        },
      ],
    },
    {
      path: "/todos",
      component: Todos,
    },
  ],
});

export default router;
