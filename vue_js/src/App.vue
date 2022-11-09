<script lang="ts">
import { RouterLink, RouterView } from "vue-router";
export default {
  data: () => ({ RouterLink, RouterView }),
};
</script>

<template>
  <header class="w-full bg-gray-50 mb-4 p-4 rounded-b-3xl">
    <nav class="flex gap-4">
      <RouterLink
        class="px-4 py-2 duration-150 hover:text-purple-700"
        to="/sign-up"
      >
        Sign Up
      </RouterLink>
      <RouterLink
        class="px-4 py-2 duration-150 hover:text-purple-700"
        to="/sign-in"
      >
        Sign In
      </RouterLink>
    </nav>
  </header>

  <RouterView />
</template>
