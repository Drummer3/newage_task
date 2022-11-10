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
      props: { edit: false },
      beforeEnter: () => {
        if (!authStore.state.authenticated) return false;
      },
      component: () => import("../views/ProfileView.vue"),
    },
    {
      path: "/profile/:userId/edit",
      name: "profile-edit",
      props: { edit: true },
      beforeEnter: () => {
        if (!authStore.state.authenticated) return false;
      },
      component: () => import("../views/ProfileView.vue"),
    },
    {
      path: "/profile/:userId/delete",
      name: "profile-delete",
      beforeEnter: () => {
        if (!authStore.state.authenticated) return false;
      },
      component: () => import("../views/DeleteView.vue"),
    },
  ],
});

export default router;
