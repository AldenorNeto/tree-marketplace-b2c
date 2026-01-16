import { createRouter, createWebHistory } from "vue-router";
import App from "../App.vue";

const routes = [
  {
    path: "/",
    redirect: "/create",
  },
  {
    path: "/create",
    name: "Create",
    component: App,
    meta: { page: "Create" },
  },
  {
    path: "/shop",
    name: "Shop",
    component: App,
    meta: { page: "Shop" },
  },
  {
    path: "/grid",
    name: "Grid",
    component: App,
    meta: { page: "Grid" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
