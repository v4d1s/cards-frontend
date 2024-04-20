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

    isLoading: true,

    visible: "general",
    packName: "",
    sort: "0updated",
    userId: -1,
    isAdmin: false,
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
    setIsAdmin(state: any, isAdmin: boolean) {
      state.isAdmin = isAdmin;
    },
    setPage(state: any, page: number) {
      state.page = page;
    },
    setRow(state: any, row: number) {
      state.row = row;
    },
    setIsLoading(state: any) {
      state.isLoading = false;
    },
    setVisibility(state: any, visibility: string) {
      state.visible = visibility;
    },
  },
  actions: {
    changeModal({ state, commit }: any, data: boolean) {
      commit("setNewPackModal", data);
    },
    changePage({ commit, dispatch }: any, newPage: number) {
      commit("setPage", newPage);
      dispatch("getPacks");
    },
    changePackName({ commit, dispatch }: any, search: string) {
      commit("setPackName", search);
      dispatch("getPacks");
    },
    changeVisibility({ commit, dispatch }: any, visibility: string) {
      commit("setPackName", "");
      commit("setVisibility", visibility);
      dispatch("getPacks");
    },
    changeSort({ commit, dispatch }: any, sort: string) {
      commit("setSort", sort);
      dispatch("getPacks");
    },

    getPacks({ dispatch, state }: any) {
      if (state.visible == "general") {
        dispatch("getPacksGeneral");
      }
      if (state.visible == "private") {
        dispatch("getPacksPrivate");
      }
      if (state.visible == "all") {
        dispatch("getPacksAll");
      }
      if (state.visible == "private_all") {
        dispatch("getPacksPrivateAll");
      }
    },
    async getPacksGeneral({ commit, state }: any) {
      const response = await axios({
        url:
          "http://localhost:3000/pack/?page=" +
          state.page +
          "&sortPacks=" +
          state.sort +
          "&packName=" +
          state.packName,
        method: "get",
      });
      commit("setPacks", response.data.cardPacks);
      commit("setRow", response.data.cardPacksTotalCount);
      commit("setIsLoading");
    },
    async getPacksAll({ commit, state }: any) {
      const response = await axios({
        url:
          "http://localhost:3000/pack/all?page=" +
          state.page +
          "&sortPacks=" +
          state.sort +
          "&packName=" +
          state.packName,
        method: "get",
      });
      commit("setPacks", response.data.rows);
      commit("setRow", response.data.count);
    },
    async getPacksPrivate({ commit, state }: any) {
      const response = await axios({
        url:
          "http://localhost:3000/pack/?page=" +
          state.page +
          "&sortPacks=" +
          state.sort +
          "&packName=" +
          state.packName +
          "&user_id=" +
          state.userId,
        method: "get",
      });
      commit("setPacks", response.data.cardPacks);
      commit("setRow", response.data.cardPacksTotalCount);
    },
    async getPacksPrivateAll({ commit, state }: any) {
      const response = await axios({
        url:
          "http://localhost:3000/pack/private" +
          "?page=" +
          state.page +
          "&sortPacks=" +
          state.sort +
          "&packName=" +
          state.packName,
        method: "get",
      });
      commit("setPacks", response.data.cardPacks);
      commit("setRow", response.data.cardPacksTotalCount);
    },

    async createPack({ commit, state }: any, newPack: string) {
      await axios({
        url: "http://localhost:3000/pack",
        method: "post",
        data: {
          name: newPack,
          userId: state.userId,
        },
        headers: {
          Authorization: "Bearer " + state.cookies.cookies.get("access_token"),
        },
      });
      commit("setNewPackModal", false);
      await router.go(0);
    },
    getUserId({ commit, state }: any) {
      const token = state.cookies.cookies.get("access_token");
      if (token) {
        const id: number = Object(jwtDecode(token)).id;
        const isAdmin: boolean = Object(jwtDecode(token)).isAdmin;
        commit("setUserId", id);
        commit("setIsAdmin", isAdmin);
      }
    },
  },
  namespaced: true,
};
