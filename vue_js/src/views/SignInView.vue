<script lang="ts">
import authStore from "@/store/authStore";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  computed: {
    error() {
      return authStore.state.logInError;
    },
  },
  methods: {
    async submitHandler() {
      authStore.commit("setLogInError", "");
      if (!this.email.includes("@newage.io"))
        return authStore.commit(
          "setLogInError",
          "Please use email with @newage.io"
        );
      if (this.password.length < 8)
        return authStore.commit(
          "setLogInError",
          "Password length must be equal or more than 8 characters"
        );
      authStore.dispatch("signIn", {
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>

<template>
  <form
    @submit.prevent="submitHandler"
    class="bg-gray-50 p-4 rounded-xl flex flex-col gap-4 max-w-xs mx-auto shadow-lg shadow-gray-900 duration-150 hover:shadow-gray-500"
  >
    <p class="text-center text-xl">Sign In</p>
    <div v-if="error" class="error-box">
      <span>{{ error }}</span>
    </div>
    <label class="form-field">
      <p>Email</p>
      <input
        required
        type="email"
        placeholder="someone@newage.io"
        v-model="email"
      />
    </label>
    <label class="form-field">
      <p>Password</p>
      <input
        required
        type="password"
        placeholder="p4ssw0rd"
        v-model="password"
      />
    </label>
    <button class="button button__purple" type="submit">Sign In</button>
  </form>
</template>
