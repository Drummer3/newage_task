<script lang="ts">
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
  methods: {
    async submitHandler() {
      const response = await fetch("http://localhost:8000/api/auth/sign-up", {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Accept-Encoding": "gzip, deflate, br",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: this.firstName,
          lastName: this.lastName,
          birthday: this.birthday,
          email: this.email,
          password: this.password,
        }),
      });
      if (!response.ok) {
        console.error((await response.json()).error);
      }
    },
  },
};
</script>

<template>
  <form
    @submit.prevent="submitHandler"
    class="flex flex-col max-w-md gap-4 mx-auto"
  >
    <label>
      <p>First Name</p>
      <input
        :required="false"
        type="text"
        placeholder="First name"
        v-model="firstName"
      />
    </label>
    <label>
      <p>Last Name</p>
      <input
        :required="false"
        type="text"
        placeholder="Last name"
        v-model="lastName"
      />
    </label>
    <label>
      <p>Birthday</p>
      <input :required="false" type="date" v-model="birthday" />
    </label>
    <label>
      <p>Email</p>
      <input :required="false" type="email" v-model="email" />
    </label>
    <label>
      <p>Password</p>
      <input :required="false" type="password" v-model="password" />
    </label>
    <button type="submit">Submit</button>
  </form>
  <div></div>
</template>
