import { isAuthenticated } from "@/api/accessToken";
import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/login",
    name: "login",
    meta: {
      requiresUnauth: true,
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
  {
    path: "/auth",
    name: "auth",
    meta: {
      requiresUnauth: true,
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "auth" */ "../views/GithubAuth.vue"),
  },
  {
    name: "main-layout",
    path: "/",
    component: () => import("../layouts/DefaultLayout.vue"),
    redirect: "/users",
    children: [
      {
        path: "/users",
        name: "users",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "users" */ "../views/Users.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresUnauth = to.matched.some((record) => record.meta.requiresUnauth);
  const requiresAuth = !requiresUnauth;

  if (requiresAuth && !isAuthenticated()) next({ name: "login" });
  else if (requiresUnauth && isAuthenticated()) next({ name: "users" });
  else next();
});

export default router;
