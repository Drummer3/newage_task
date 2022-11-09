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
  actions: {
    pageLoad(context) {
      const localToken = localStorage.getItem("authToken");
      if (localToken) {
        context.commit("login", localToken);
      }
    },
  },
});

export default authStore;
