import { createStore } from "vuex";

const authStore = createStore({
  state() {
    return {
      authenticated: false,
      token: "",
      user: { firstName: "", lastName: "", birthday: "", email: "", uuid: "" },
      userEditError: "",
    };
  },
  mutations: {
    login(state, token: string) {
      state.token = token;
      state.authenticated = true;
      localStorage.setItem("authToken", token);
    },
    logout(state) {
      state.token = "";
      state.authenticated = false;
      localStorage.removeItem("authToken");
    },
    userEditError(state, error) {
      state.userEditError = error;
    },
    userEditSuccess(state, user) {
      state.user = user;
    },
  },
  actions: {
    pageLoad(context) {
      const localToken = localStorage.getItem("authToken");
      if (localToken) {
        context.commit("login", localToken);
      }
    },
    async userEdit(context, payload) {
      const response: any = await fetch(
        `http://localhost:8000/api/users/${payload.uuid}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${authStore.state.token}`,
            Accept: "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload.user),
        }
      );
      if (!response.ok)
        return context.commit("userEditError", (await response.json()).error);
      return context.commit("userEditSuccess", (await response.json()).user);
    },
    setUserEditError(context, error) {
      context.commit("userEditError", error);
    },

    // Handles logout request
    logout(context) {
      context.commit("logout");
    },
  },
});

export default authStore;
