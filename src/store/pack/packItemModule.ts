import axios from "axios";
import router from "@/router";
import { useCookies } from "vue3-cookies";

// TODO убрать store для компонентов
export const packItemModule = {
  state: () => ({
    modalDelete: false,
    modalEdit: false,

    newPrivate: false,
    newName: "",

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
    setNewPrivate(state: any, payload: boolean) {
      state.newPrivate = payload;
    },
    setNewName(state: any, name: string) {
      state.newName = name;
    },
  },
  actions: {
    changeModalDelete({ commit }: any, payload: boolean) {
      commit("setModalDelete", payload);
    },
    changeModalEdit({ commit }: any, payload: boolean) {
      commit("setModalEdit", payload);
      commit("setNewName", "");
      commit("setNewPrivate", false);
    },
    changeNewPrivate({ commit, state }: any) {
      commit("setNewPrivate", !state.newPrivate);
    },
  },
  namespaced: true,
};
