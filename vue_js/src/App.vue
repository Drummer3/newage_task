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
      authStore.commit("logout");
      return this.$router.push("/");
    },
  },
};
</script>

<template>
  <header class="header">
    <nav>
      <RouterLink class="header__link" to="/sign-up" v-if="!isAuthenticated">
        Sign Up
      </RouterLink>
      <RouterLink class="header__link" to="/sign-in" v-if="!isAuthenticated">
        Sign In
      </RouterLink>
      <RouterLink class="header__link" to="/profile" v-if="isAuthenticated">
        Profile
      </RouterLink>
      <RouterLink
        class="header__link"
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
