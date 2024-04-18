import axios from "axios";
import router from "@/router";

export const authRegisterModule = {
  state: () => ({
    userData: {
      email: "",
      password: "",
      password2: "",
    },
    haveError: false,
    error: "",
  }),
  mutations: {
    setUserData(state: any, userData: any) {
      state.userData.email = userData.email;
      state.userData.password = userData.password;
      state.userData.password2 = userData.password2;
    },
    setError(state: any, error: string) {
      state.error = error;
    },
    setHaveError(state: any, hasError: boolean) {
      state.haveError = hasError;
    },
  },
  actions: {
    async registerUser({ state, commit }: any) {
      commit("setHaveError", false);
      commit("setError", "");

      if (state.userData.password != state.userData.password2) {
        commit("setError", "Пароли не совпадают!");
        commit("setHaveError", true);
        commit("setUserData", {
          email: state.userData.email,
          password: "",
          password2: "",
        });
      } else {
        const log = await axios({
          url: "http://localhost:3000/auth/register",
          method: "post",
          data: {
            email: state.userData.email,
            password: state.userData.password,
          },
        });

        if (log.data.error != undefined) {
          commit("setError", log.data.error);
          commit("setHaveError", true);
        } else {
          commit("setUserData", { email: "", password: "", password2: "" });
          await router.push("/login");
        }
      }
    },
  },
  namespaced: true,
};
