<script lang="ts">
import authStore from "@/store/authStore";

export default {
  props: ["edit"],
  computed: {
    user() {
      return authStore.state.user;
    },
    error() {
      return authStore.state.userInfoError || authStore.state.userEditError;
    },
  },
  async created() {
    authStore.commit("setUserEditError", "");
    if (!this.user.uuid) {
      authStore.dispatch("userInfo");
    }
  },
  methods: {
    async handleUserEditSubmit() {
      if (this.$route.params.userId !== this.user.uuid)
        return authStore.commit(
          "setUserEditError",
          "You can't change other user's details"
        );
      authStore.commit("setUserEditError", "");
      authStore.dispatch("userEdit", {
        uuid: this.user.uuid,
        user: { firstName: this.user.firstName, lastName: this.user.lastName },
      });
    },
  },
};
</script>

<template>
  <div class="card card__purple">
    <div class="action-buttons__top-right">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="icon-button icon-button__purple"
        v-if="!edit"
        @click="() => $router.push(`/profile/${user.uuid}/edit`)"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="icon-button icon-button__red"
        @click="() => $router.push(`/profile/${user.uuid}/delete`)"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
        />
      </svg>
    </div>
    <p class="title">{{ edit ? "Edit " : undefined }}Profile</p>
    <div v-if="edit && error" class="error-box">
      <span>{{ error }}</span>
    </div>
    <label class="form-field">
      <p>First Name</p>
      <input
        :disabled="!edit"
        type="text"
        placeholder="David"
        v-model="user.firstName"
      />
    </label>
    <label class="form-field">
      <p>Last Name</p>
      <input
        :disabled="!edit"
        type="text"
        placeholder="Munjishvili"
        v-model="user.lastName"
      />
    </label>
    <label class="form-field">
      <p>Birthday</p>
      <input disabled type="text" :value="user.birthday" />
    </label>
    <label class="form-field">
      <p>Email</p>
      <input disabled type="text" :value="user.email" />
    </label>
    <label class="form-field">
      <p>Unique ID</p>
      <input disabled type="text" :value="user.uuid" />
    </label>
    <button
      v-if="edit"
      class="button button__purple"
      @click="handleUserEditSubmit"
    >
      Update User
    </button>
    <button
      v-if="edit"
      class="button button__red"
      @click="() => $router.push(`/profile`)"
    >
      Cancel
    </button>
  </div>
</template>
