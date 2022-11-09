<script lang="ts">
import { RouterLink, RouterView } from "vue-router";
export default {
  data: () => ({ RouterLink, RouterView }),
};
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/sign-up">Sign Up</RouterLink>
      <RouterLink to="/sign-in">Sign In</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>
