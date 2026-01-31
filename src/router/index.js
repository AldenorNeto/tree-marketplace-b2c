import { createRouter, createWebHistory } from "vue-router";
import App from "../App.vue";

const routes = [
  {
    path: "/",
    redirect: "/shop",
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
    path: "/registro",
    name: "Registro",
    component: App,
    meta: { page: "Registro" },
  },
  {
    path: "/cenario",
    name: "Cenario",
    component: App,
    meta: { page: "Cenario" },
  },
];

const router = createRouter({
  history: createWebHistory("/tree-marketplace-b2c/"),
  routes,
});

export default router;
