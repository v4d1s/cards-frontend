import axios from "axios";
import router from "@/router";
import { useCookies } from "vue3-cookies";
import { jwtDecode } from "jwt-decode";

export const packListModule = {
  state: () => ({
    cookies: useCookies(),
    newPackModal: false,

    packs: [],
    row: 0,

    visible: "general",
    packName: "",
    sort: "0updated",
    userId: -1,
    page: 1,
  }),
  mutations: {
    setNewPackModal(state: any, userData: boolean) {
      state.newPackModal = userData;
    },
    setPacks(state: any, newPack: any) {
      state.packs = newPack;
    },
    setPackName(state: any, name: string) {
      state.packName = name;
    },
    setSort(state: any, sort: string) {
      state.sort = sort;
    },
    setUserId(state: any, userId: number) {
      state.userId = userId;
    },
    setPage(state: any, page: number) {
      state.page = page;
    },
    setRow(state: any, row: number) {
      state.row = row;
    },
  },
  actions: {
    changeModal({ state, commit }: any, data: boolean) {
      commit("setNewPackModal", data);
    },
    async createPack({ commit, state }: any, newPack: string) {
      await axios({
        url: "http://localhost:3000/pack",
        method: "post",
        data: {
          name: newPack,
          userId: Object(jwtDecode(state.cookies.cookies.get("access_token")))
            .id,
        },
        headers: {
          Authorization: "Bearer " + state.cookies.cookies.get("access_token"),
        },
      });
      commit("setNewPackModal", false);
    },
    // TODO изменить вывод на общие (в конце)
    async getPacksDefault({ commit, state }: any) {
      const response = await axios({
        url:
          "http://localhost:3000/pack/all?page=" +
          state.page +
          "&sortPacks=" +
          state.sort +
          "&packName=" +
          state.packName,
        method: "get",
        // headers: {
        //   Authorization: "Bearer " + state.cookies.cookies.get("access_token"),
        // },
      });
      commit("setPacks", response.data.rows);
      commit("setRow", response.data.count);
    },
    async getPacksByUser({ commit, state }: any) {
      const packs = await axios({
        url: "http://localhost:3000/auth/login",
        method: "get",
      });
      commit("setPacks", packs);
    },
  },
  namespaced: true,
};
