import Vue from "vue";
import Router from "vue-router";

import Bestiary from "@/views/bestiary/Monsters";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "bestiary",
      component: Bestiary
    }
  ]
});
