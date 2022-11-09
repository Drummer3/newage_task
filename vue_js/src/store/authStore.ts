import { createStore } from "vuex";
import router from "../router/index";

const authStore = createStore({
  state() {
    return {
      authenticated: false,
      token: "",
      user: { firstName: "", lastName: "", birthday: "", email: "", uuid: "" },
      logInError: "",
      userEditError: "",
      userInfoError: "",
    };
  },
  mutations: {
    login(state, token: string) {
      state.token = token;
      state.authenticated = true;
      localStorage.setItem("authToken", token);
    },
    setLogInError(state, error) {
      state.logInError = error;
    },
    logout(state) {
      state.token = "";
      state.authenticated = false;
      localStorage.removeItem("authToken");
    },
    userInfoSuccess(state, user) {
      state.user = user;
    },
    userInfoError(state, error) {
      state.userInfoError = error;
    },
    userEditError(state, error) {
      state.userEditError = error;
    },
    userEditSuccess(state, user) {
      state.user = user;
      router.push("/profile");
    },
  },
  actions: {
    pageLoad(context) {
      const localToken = localStorage.getItem("authToken");
      if (localToken) {
        context.commit("login", localToken);
      }
    },

    async signIn(context, payload) {
      const response: any = await fetch(
        "http://localhost:8000/api/auth/sign-in",
        {
          method: "POST",
          headers: {
            Accept: "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) {
        context.commit("setLogInError", (await response.json()).error);
      } else {
        const token = (await response.json()).token;
        context.commit("login", token);
        router.replace("/profile");
      }
    },

    async userInfo(context) {
      context.commit("userInfoError", "");
      const response: any = await fetch("http://localhost:8000/api/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authStore.state.token}`,
          Accept: "*/*",
          "Accept-Encoding": "gzip, deflate, br",
          "Content-Type": "application/json",
        },
      });
      if (!response.ok)
        return context.commit("userInfoError", (await response.json()).error);
      context.commit("userInfoSuccess", (await response.json()).user);
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
