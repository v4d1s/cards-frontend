export const packListModule = {
  state: () => ({
    newPackModal: false,
    newPack: "",

    packs: [],

    packName: "",
    sort: "0updated",
    userId: -1,
    page: -1,
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
  },
  actions: {
    changeModal({ state, commit }: any, data: boolean) {
      commit("setNewPackModal", data);
    },
    async getPacks({ commit, state }: any) {
      state;
    },
  },
  namespaced: true,
};
