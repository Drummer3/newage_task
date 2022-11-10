<script lang="ts">
import { RouterLink, RouterView } from "vue-router";
import authStore from "./store/authStore";
export default {
  components: {
    RouterLink,
    RouterView,
  },
  computed: {
    isAuthenticated() {
      return authStore.state.authenticated;
    },
  },
  created() {
    authStore.dispatch("pageLoad");
  },
  methods: {
    logOut() {
      authStore.dispatch("logout");
      return this.$router.push("/");
    },
  },
};
</script>

<template>
  <header class="w-full bg-gray-50 mb-4 p-4 rounded-b-3xl">
    <nav class="flex gap-4">
      <RouterLink
        class="px-4 py-2 duration-150 hover:text-purple-700"
        to="/sign-up"
        v-if="!isAuthenticated"
      >
        Sign Up
      </RouterLink>
      <RouterLink
        class="px-4 py-2 duration-150 hover:text-purple-700"
        to="/sign-in"
        v-if="!isAuthenticated"
      >
        Sign In
      </RouterLink>
      <RouterLink
        class="px-4 py-2 duration-150 hover:text-purple-700"
        to="/profile"
        v-if="isAuthenticated"
      >
        Profile
      </RouterLink>
      <RouterLink
        class="px-4 py-2 duration-150 hover:text-purple-700"
        to="/"
        v-if="isAuthenticated"
        @click.prevent="logOut"
      >
        Log Out
      </RouterLink>
    </nav>
  </header>

  <RouterView />
</template>
