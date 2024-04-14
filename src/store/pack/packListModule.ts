import axios from "axios";
import router from "@/router";
import { useCookies } from "vue3-cookies";

export const packListModule = {
  state: () => ({
    cookies: useCookies(),
    newPackModal: false,
    newPack: "",

    packs: [],
    row: 0,

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
    async getPacksDefault({ commit, state }: any) {
      const response = await axios({
        url:
          "http://localhost:3000/pack?page=" +
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
      commit("setPacks", response.data.cardPacks);
      commit("setRow", response.data.cardPacksTotalCount);
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
