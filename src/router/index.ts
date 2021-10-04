import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/task1",
    name: "Task1",
    component: () =>
      import(/* webpackChunkName: "task1" */ "../views/FirstTask.vue"),
  },
  {
    path: "/task2",
    name: "Task2",
    component: () =>
      import(/* webpackChunkName: "task2" */ "../views/SecondTask.vue"),
  },
  { path: "*", redirect: "/task1" },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
