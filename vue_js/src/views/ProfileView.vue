<script lang="ts">
import authStore from "@/store/authStore";

export default {
  data() {
    return {
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
};
</script>

<template>
  <div
    class="bg-gray-50 p-4 rounded-xl flex flex-col gap-4 max-w-sm mx-auto shadow-lg shadow-gray-900 duration-150 outline-0 outline outline-purple-500 transition-all hover:outline-2 hover:shadow-gray-500"
  >
    <p class="text-center text-xl">Profile</p>
    <label>
      <p class="text-xs">First Name</p>
      <input
        disabled
        class="w-full bg-gray-800 rounded-lg px-4 py-2 duration-100 text-gray-50 focus:outline-none focus:bg-gray-700"
        type="text"
        placeholder="David"
        :value="user.firstName"
      />
    </label>
    <label>
      <p class="text-xs">Last Name</p>
      <input
        disabled
        class="w-full bg-gray-800 rounded-lg px-4 py-2 duration-100 text-gray-50 focus:outline-none focus:bg-gray-700"
        type="text"
        placeholder="Munjishvili"
        :value="user.lastName"
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
  </div>
</template>
