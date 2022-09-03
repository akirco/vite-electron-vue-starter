import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Tools from "@/views/Tools.vue";
import Bili from "@/views/Bilidown.vue";
import Todos from "@/views/Todos.vue";

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
    {
      path: "/bilidown",
      component: Bili,
    },
    {
      path: "/todos",
      component: Todos,
    },
  ],
});

export default router;
