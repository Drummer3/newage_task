<script lang="ts">
import router from "@/router";
import authStore from "@/store/authStore";

export default {
  data() {
    return { router };
  },
  computed: {
    user() {
      return authStore.state.user;
    },
    error() {
      return authStore.state.userInfoError || authStore.state.userEditError;
    },
  },
  async created() {
    if (this.$route.params.userId !== authStore.state.user.uuid) {
      this.$router.back();
    }
  },
  methods: {
    deleteUser() {
      if (this.$route.params.userId !== authStore.state.user.uuid) {
        this.$router.back();
      }
      authStore.dispatch("userDelete", authStore.state.user.uuid);
    },
  },
};
</script>

<template>
  <div
    class="relative bg-gray-50 p-4 rounded-xl flex flex-col gap-4 max-w-sm mx-auto shadow-lg shadow-gray-900 duration-150 outline-0 outline outline-purple-500 transition-all hover:outline-2 hover:shadow-gray-500"
  >
    <p class="text-center text-xl">Delete Profile</p>
    <p class="text-center text-md">
      Delete action is irreversible and you will lose access to your account!
    </p>
    <button
      class="w-full px-4 py-2 rounded-lg text-gray-50 bg-red-600 duration-100 hover:bg-red-500"
      @click="deleteUser"
    >
      Delete
    </button>
    <button
      class="w-full px-4 py-2 rounded-lg text-gray-50 bg-purple-600 duration-100 hover:bg-purple-500"
      @click="() => router.back()"
    >
      Cancel
    </button>
  </div>
</template>
