import axios from "axios";
import router from "@/router";
import { useCookies } from "vue3-cookies";

export const authLoginModule = {
  state: () => ({
    userData: {
      email: "",
      password: "",
    },
    haveError: false,
    error: "",
    cookies: useCookies(),
  }),
  mutations: {
    setUserData(state: any, userData: any) {
      state.userData.email = userData.email;
      state.userData.password = userData.password;
    },
    setError(state: any, error: string) {
      state.error = error;
    },
    setHaveError(state: any, hasError: boolean) {
      state.haveError = hasError;
    },
  },
  actions: {
    async loginUser({ state, commit }: any) {
      commit("setHaveError", false);
      const log = await axios({
        url: process.env.VUE_APP_BACKEND + "auth/login",
        method: "post",
        data: {
          email: state.userData.email,
          password: state.userData.password,
        },
      });

      if (log.data.access_token != undefined) {
        state.cookies.cookies.set("access_token", log.data.access_token);
        await router.push("/packs");
        router.go(0);
      } else {
        commit("setError", log.data.error);
        commit("setHaveError", true);
        commit("setUserData", { email: "", password: "" });
      }
    },
  },
  namespaced: true,
};
