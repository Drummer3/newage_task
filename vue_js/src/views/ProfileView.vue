<script lang="ts">
import authStore from "@/store/authStore";

export default {
  props: ["edit"],
  data() {
    return {
      error: "",
      user: { firstName: "", lastName: "", birthday: "", email: "", uuid: "" },
    };
  },
  async created() {
    const response = await fetch("http://localhost:8000/api/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authStore.state.token}`,
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) return console.error(await response.json());
    this.user = (await response.json()).user;
  },
  methods: {
    async handleUserEdit() {
      if (this.$route.params.userId !== this.user.uuid)
        return (this.error = "You can't change other user's details");
      this.error = "";

      const response = await fetch(
        `http://localhost:8000/api/users/${this.user.uuid}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${authStore.state.token}`,
            Accept: "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: this.user.firstName,
            lastName: this.user.lastName,
          }),
        }
      );
      if (!response.ok) return (this.error = (await response.json()).error);
    },
  },
};
</script>

<template>
  <div
    class="bg-gray-50 p-4 rounded-xl flex flex-col gap-4 max-w-sm mx-auto shadow-lg shadow-gray-900 duration-150 outline-0 outline outline-purple-500 transition-all hover:outline-2 hover:shadow-gray-500"
  >
    <p class="text-center text-xl">Profile</p>
    <div
      v-if="edit && error"
      class="p-4 border-2 border-red-500 rounded-lg text-center"
    >
      <span class="text-sm font-semibold">{{ error }}</span>
    </div>
    <label>
      <p class="text-xs">First Name</p>
      <input
        :disabled="!edit"
        class="w-full bg-gray-800 rounded-lg px-4 py-2 duration-100 text-gray-50 focus:outline-none focus:bg-gray-700"
        type="text"
        placeholder="David"
        v-model="user.firstName"
      />
    </label>
    <label>
      <p class="text-xs">Last Name</p>
      <input
        :disabled="!edit"
        class="w-full bg-gray-800 rounded-lg px-4 py-2 duration-100 text-gray-50 focus:outline-none focus:bg-gray-700"
        type="text"
        placeholder="Munjishvili"
        v-model="user.lastName"
      />
    </label>
    <label>
      <p class="text-xs">Birthday</p>
      <input
        disabled
        class="w-full bg-gray-800 rounded-lg px-4 py-2 duration-100 text-gray-50 focus:outline-none focus:bg-gray-700"
        type="text"
        :value="user.birthday"
      />
    </label>
    <label>
      <p class="text-xs">Email</p>
      <input
        disabled
        class="w-full bg-gray-800 rounded-lg px-4 py-2 duration-100 text-gray-50 focus:outline-none focus:bg-gray-700"
        type="text"
        :value="user.email"
      />
    </label>
    <label>
      <p class="text-xs">Unique ID</p>
      <input
        disabled
        class="w-full bg-gray-800 rounded-lg px-4 py-2 duration-100 text-gray-50 focus:outline-none focus:bg-gray-700"
        type="text"
        :value="user.uuid"
      />
    </label>
    <button
      v-if="edit"
      class="w-full px-4 py-2 rounded-lg text-gray-50 bg-purple-600 duration-100 hover:bg-purple-500"
      @click="handleUserEdit"
    >
      Update User
    </button>
  </div>
</template>
