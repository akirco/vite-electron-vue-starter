import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Tools from "@/views/Tools.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/tools",
      component: Tools,
    },
  ],
});

export default router;
