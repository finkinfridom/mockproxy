import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/keys/:key/requests/new",
      name: "new-request",
      component: () => import("./views/NewRequest.vue")
    },
    {
      path: "/keys/:key",
      name: "key-detail",
      component: () => import("./views/KeyDetail.vue")
    }
  ]
});
