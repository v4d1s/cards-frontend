import axios from "axios";
import router from "@/router";
import { useCookies } from "vue3-cookies";

export const authLoginModule = {
  state: () => ({
    userData: {
      email: "",
      password: "",
    },
    cookies: useCookies(),
  }),
  mutations: {
    setUserData(state: any, userData: any) {
      state.userData.email = userData.email;
      state.userData.password = userData.password;
    },
  },
  actions: {
    async loginUser({ state, commit }: any) {
      try {
        const log = await axios({
          url: "http://localhost:3000/auth/login",
          method: "post",
          data: {
            email: state.userData.email,
            password: state.userData.password,
          },
        });

        // console.log(log.data);
        state.cookies.cookies.set("access_token", log.data.access_token);
        state.cookies.cookies.set("name", log.data.name.toString());

        await router.push("/packs");
        router.go(0);
      } catch (error: any) {
        // TODO обработка ошибок
        console.log(error.message);
      }
      commit("setUserData", { email: "", password: "" });
    },
  },
  namespaced: true,
};
