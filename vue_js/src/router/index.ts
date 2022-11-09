import authStore from "@/store/authStore";
import HomeView from "@/views/HomeView.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },

    {
      path: "/sign-up",
      name: "sign-up",
      beforeEnter: () => {
        if (authStore.state.authenticated) return false;
      },
      component: () => import("../views/SignUpView.vue"),
    },
    {
      path: "/sign-in",
      name: "sign-in",
      beforeEnter: () => {
        if (authStore.state.authenticated) return false;
      },
      component: () => import("../views/SignInView.vue"),
    },
    {
      path: "/profile",
      name: "profile",
      beforeEnter: () => {
        if (!authStore.state.authenticated) return false;
      },
      component: () => import("../views/ProfileView.vue"),
    },
  ],
});

export default router;
