<script lang="ts">
import authStore from "../store/authStore";
export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      birthday: "",
      email: "",
      password: "",
    };
  },
  computed: {
    error() {
      return authStore.state.signUpError;
    },
  },
  methods: {
    async submitHandler() {
      authStore.commit("setSignUpError", "");
      const payload = {
        firstName: this.firstName,
        lastName: this.lastName,
        birthday: this.birthday,
        email: this.email,
        password: this.password,
      };
      authStore.dispatch("signUp", payload);
    },
  },
};
</script>

<template>
  <form
    @submit.prevent="submitHandler"
    class="bg-gray-50 p-4 rounded-xl flex flex-col gap-4 max-w-xs mx-auto shadow-lg shadow-gray-900 duration-150 hover:shadow-gray-500"
  >
    <p class="text-center text-xl">Sign Up</p>
    <div
      v-if="error"
      class="p-4 border-2 border-red-500 rounded-lg text-center"
    >
      <span class="text-sm font-semibold">{{ error }}</span>
    </div>
    <label>
      <p class="text-xs">First Name</p>
      <input
        required
        class="w-full bg-gray-800 rounded-lg px-4 py-2 duration-100 text-gray-50 focus:outline-none focus:bg-gray-700"
        type="text"
        placeholder="David"
        v-model="firstName"
      />
    </label>
    <label>
      <p class="text-xs">Last Name</p>
      <input
        required
        class="w-full bg-gray-800 rounded-lg px-4 py-2 duration-100 text-gray-50 focus:outline-none focus:bg-gray-700"
        type="text"
        placeholder="Munjishvili"
        v-model="lastName"
      />
    </label>
    <label>
      <p class="text-xs">Birthday</p>
      <input
        required
        class="w-full bg-gray-800 rounded-lg px-4 py-2 duration-100 text-gray-50 focus:outline-none focus:bg-gray-700"
        type="date"
        v-model="birthday"
      />
    </label>
    <label>
      <p class="text-xs">Email</p>
      <input
        required
        class="w-full bg-gray-800 rounded-lg px-4 py-2 duration-100 text-gray-50 focus:outline-none focus:bg-gray-700"
        type="email"
        v-model="email"
      />
    </label>
    <label>
      <p class="text-xs">Password</p>
      <input
        required
        class="w-full bg-gray-800 rounded-lg px-4 py-2 duration-100 text-gray-50 focus:outline-none focus:bg-gray-700"
        type="password"
        placeholder="p4ssw0rd"
        v-model="password"
      />
    </label>
    <button
      class="w-full px-4 py-2 rounded-lg text-gray-50 bg-purple-600 duration-100 hover:bg-purple-500"
      type="submit"
    >
      Sign Up
    </button>
  </form>
</template>
