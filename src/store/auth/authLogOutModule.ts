import { useCookies } from "vue3-cookies";
import router from "@/router";

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
      state.cookies.cookies.remove("name");
      state.cookies.cookies.remove("access_token");

      await router.push("/login");
      router.go(0);
    },
    getName({ state, commit }: any) {
      const name = state.cookies.cookies.get("name");
      if (name) {
        commit("setName", name);
      } else {
        commit("setName", false);
      }
    },
  },
  namespaced: true,
};
