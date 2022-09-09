import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/home/Home.vue";
import Realesgan from "@/views/realesrgan/Realesgan.vue";
import Downloader from "@/views/downloader/Downloader.vue";
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
      path: "/downloader",
      component: Downloader,
      children: [
        {
          path: "/downloader/predownload",
          component: () => import("@/views/downloader/child/predownload.vue"),
        },
        {
          path: "/downloader/downloads",
          component: () => import("@/views/downloader/child/downloads.vue"),
        },
        {
          path: "/downloader/files",
          component: () => import("@/views/downloader/child/files.vue"),
        },
        {
          path: "/downloader/settings",
          component: () => import("@/views/downloader/child/settings.vue"),
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
