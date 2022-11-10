import { createStore } from "vuex";
import router from "../router/index";

const authStore = createStore({
  state() {
    return {
      authenticated: false,
      token: "",
      user: { firstName: "", lastName: "", birthday: "", email: "", uuid: "" },
      logInError: "",
      signUpError: "",
      userEditError: "",
      userInfoError: "",
      userDeleteError: "",
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
      state.user = {
        firstName: "",
        lastName: "",
        birthday: "",
        email: "",
        uuid: "",
      };
      localStorage.removeItem("authToken");
    },
    setUser(state, user) {
      state.user = user;
    },
    setLogInError(state, error) {
      state.logInError = error;
    },
    setSignUpError(state, error) {
      state.signUpError = error;
    },
    setUserInfoError(state, error) {
      state.userInfoError = error;
    },
    setUserEditError(state, error) {
      state.userEditError = error;
    },
    setUserDeleteError(state, error) {
      state.userDeleteError = error;
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
        router.push("/profile");
      }
    },

    async signUp(context, payload) {
      const response = await fetch("http://localhost:8000/api/auth/sign-up", {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Accept-Encoding": "gzip, deflate, br",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok)
        context.commit("setSignUpError", (await response.json()).error);
      else router.push("/sign-in");
    },

    async userInfo(context) {
      context.commit("setUserInfoError", "");
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
        return context.commit(
          "setUserInfoError",
          (await response.json()).error
        );
      context.commit("setUser", (await response.json()).user);
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
        return context.commit(
          "setUserInfoError",
          (await response.json()).error
        );
      context.commit("setUser", (await response.json()).user);
      return router.push("/profile");
    },

    async userDelete(context, uuid) {
      const response: any = await fetch(
        `http://localhost:8000/api/users/${uuid}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${authStore.state.token}`,
            Accept: "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok)
        return context.commit(
          "setUserDeleteError",
          (await response.json()).error
        );
      context.commit("logout");
      return router.push("/");
    },
  },
});

export default authStore;
