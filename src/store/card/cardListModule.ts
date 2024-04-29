import axios from "axios";
import { useCookies } from "vue3-cookies";
import { jwtDecode } from "jwt-decode";
import router from "@/router";

export const cardListModule = {
  state: () => ({
    cookies: useCookies(),

    packName: "",
    packId: 0,

    cards: [],
    row: 0,

    isLoading: true,

    cardName: "",
    sort: "0updated",
    authorId: -2,
    userId: -1,
    isAdmin: false,
    page: 1,
  }),
  mutations: {
    setCards(state: any, newCards: any) {
      state.cards = newCards;
    },
    setPackName(state: any, name: string) {
      state.packName = name;
    },
    setPackId(state: any, id: number) {
      state.packId = id;
    },
    setCardName(state: any, name: string) {
      state.cardName = name;
    },
    setSort(state: any, sort: string) {
      state.sort = sort;
    },
    setUserId(state: any, userId: number) {
      state.userId = userId;
    },
    setAuthorId(state: any, id: number) {
      state.authorId = id;
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
  },
  actions: {
    changePage({ commit, dispatch }: any, newPage: number) {
      commit("setPage", newPage);
      dispatch("getCards");
    },
    changePackName({ commit, dispatch }: any, search: string) {
      commit("setCardName", search);
      commit("setPage", 1);
      dispatch("getCards");
    },
    changeSort({ commit, dispatch }: any, sort: string) {
      commit("setSort", sort);
      dispatch("getCards");
    },

    async getCards({ state, commit }: any) {
      const response = await axios({
        url:
          process.env.VUE_APP_BACKEND +
          "pack/" +
          state.packId +
          "/card" +
          "?cardQuestion=" +
          state.cardName +
          "&page=" +
          state.page +
          "&sortCards=" +
          state.sort +
          "&packId=" +
          state.packId +
          "&userId=" +
          state.userId,
        method: "get",
      });
      commit("setCards", response.data.cards);
      commit("setRow", response.data.cardsTotalCount);
      commit("setIsLoading");
    },

    async getUserAndPack({ commit, state, dispatch }: any, packId: number) {
      const token = state.cookies.cookies.get("access_token");
      if (token) {
        const id: number = Object(jwtDecode(token)).id;
        const isAdmin: boolean = Object(jwtDecode(token)).isAdmin;
        commit("setUserId", id);
        commit("setIsAdmin", isAdmin);
      }

      const response = await axios({
        url: process.env.VUE_APP_BACKEND + "pack/" + packId,
        method: "get",
      });

      if (response.data == "") {
        router.go(-1);
        return;
      }

      commit("setAuthorId", response.data.userId);
      commit("setPackId", response.data.id);
      commit("setPackName", response.data.name);

      if (
        response.data.isPrivate &&
        !state.isAdmin &&
        state.userId != state.authorId
      ) {
        router.go(-1);
        return;
      }

      dispatch("getCards");
    },
  },
  namespaced: true,
};
