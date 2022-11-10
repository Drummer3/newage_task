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
      return authStore.state.signInError;
    },
  },
  created() {
    authStore.commit("setSignInError", "");
  },
  methods: {
    async submitHandler() {
      authStore.commit("setSignInError", "");
      if (!this.email.includes("@newage.io"))
        return authStore.commit(
          "setSignInError",
          "Please use email with @newage.io"
        );
      if (this.password.length < 8)
        return authStore.commit(
          "setSignInError",
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
  <form @submit.prevent="submitHandler" class="card card__purple">
    <p class="title">Sign In</p>
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
