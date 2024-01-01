import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/drama", component: () => import("../views/DramaEditor.vue") },
    { path: "/", component: () => import("../views/HomeView.vue") },
    { path: "/getDev",component:()=>true}
  ],
});

export default router;
