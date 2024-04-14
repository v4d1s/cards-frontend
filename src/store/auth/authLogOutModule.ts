import { useCookies } from "vue3-cookies";
import router from "@/router";
import { jwtDecode, JwtPayload } from "jwt-decode";

export const authLogOutModule = {
  state: () => ({
    name: "",
    cookies: useCookies(),
  }),
  mutations: {
    setName(state: any, name: string) {
      state.name = name;
    },
  },
  actions: {
    async logoutUser({ state }: any) {
      state.cookies.cookies.remove("access_token");

      await router.push("/login");
      router.go(0);
    },
    getName({ state, commit }: any) {
      if (state.cookies.cookies.get("access_token")) {
        const token = Object(
          jwtDecode(state.cookies.cookies.get("access_token"))
        );
        if (token) {
          commit("setName", token.name);
        } else {
          commit("setName", "");
        }
      }
    },
  },
  namespaced: true,
};
