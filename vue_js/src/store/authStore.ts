import { createStore } from "vuex";

const authStore = createStore({
  state() {
    return {
      authenticated: false,
      token: "",
    };
  },
  mutations: {
    login(state, token: string) {
      state.token = token;
      state.authenticated = true;
      localStorage.setItem("authToken", token);
    },
  },
});

export default authStore;
