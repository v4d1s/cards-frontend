import axios from "axios";
import router from "@/router";

export const authRegisterModule = {
  state: () => ({
    userData: {
      email: "",
      password: "",
      password2: "",
    },
  }),
  mutations: {
    setUserData(state: any, userData: any) {
      state.userData.email = userData.email;
      state.userData.password = userData.password;
      state.userData.password2 = userData.password2;
    },
  },
  actions: {
    async registerUser({ state, commit }: any) {
      if (state.userData.password != state.userData.password2) {
        console.log("OK!");
        return;
      }
      try {
        await axios({
          url: "http://localhost:3000/auth/register",
          method: "post",
          data: {
            email: state.userData.email,
            password: state.userData.password,
          },
        });
      } catch (error: any) {
        // TODO обработка ошибок!
        console.log(error.message);
      }
      commit("setUserData", { email: "", password: "", password2: "" });
      router.push("/login");
    },
  },
  namespaced: true,
};
