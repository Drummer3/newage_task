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
  <form @submit.prevent="submitHandler" class="card card__purple">
    <p class="title">Sign Up</p>
    <div v-if="error" class="error-box">
      <span>{{ error }}</span>
    </div>
    <label class="form-field">
      <p>First Name</p>
      <input required type="text" placeholder="David" v-model="firstName" />
    </label>
    <label class="form-field">
      <p>Last Name</p>
      <input
        required
        type="text"
        placeholder="Munjishvili"
        v-model="lastName"
      />
    </label>
    <label class="form-field">
      <p>Birthday</p>
      <input required type="date" v-model="birthday" />
    </label>
    <label class="form-field">
      <p>Email</p>
      <input required type="email" v-model="email" />
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
    <button class="button button__purple" type="submit">Sign Up</button>
  </form>
</template>
