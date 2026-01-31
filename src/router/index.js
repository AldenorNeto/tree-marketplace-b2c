import { createRouter, createWebHistory } from "vue-router";
import App from "../App.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: App,
  },
];

const router = createRouter({
  history: createWebHistory("/tree-marketplace-b2c/"),
  routes,
});

export default router;
