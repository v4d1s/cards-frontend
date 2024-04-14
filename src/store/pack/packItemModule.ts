import axios from "axios";
import router from "@/router";
import { useCookies } from "vue3-cookies";

export const packItemModule = {
  state: () => ({
    modalDelete: false,
    modalEdit: false,
    newName: "",
    newPrivate: false,
    cookies: useCookies(),
    isLogin: false,
    isAuthor: false,
  }),
  mutations: {
    setModalDelete(state: any, payload: boolean) {
      state.modalDelete = payload;
    },
    setModalEdit(state: any, payload: boolean) {
      state.modalEdit = payload;
    },
    setNewName(state: any, payload: string) {
      state.newName = payload;
    },
    setNewPrivate(state: any, payload: boolean) {
      state.newPrivate = payload;
    },
  },
  actions: {
    setPack({ commit }: any, pack: any) {
      commit("setPack", pack);
    },
    changeModalDelete({ commit }: any, payload: boolean) {
      commit("setModalDelete", payload);
    },
    changeModalEdit(
      { commit }: any,
      {
        payload,
        oldName,
        newPrivate,
      }: { payload: boolean; oldName: string; newPrivate: boolean }
    ) {
      commit("setModalEdit", payload);
      commit("setNewName", oldName);
      commit("setNewPrivate", newPrivate);
    },
    changeNewPrivate({ commit, state }: any) {
      commit("setNewPrivate", !state.newPrivate);
    },
  },
  namespaced: true,
};
