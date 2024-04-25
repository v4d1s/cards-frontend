import axios from "axios";
import router from "@/router";
import { useCookies } from "vue3-cookies";
import { jwtDecode } from "jwt-decode";

export const packLearningModule = {
  state: () => ({
    cards: [],
    currentCard: [],
    count: 0,
    current: 0,

    showAnswer: false,
    userId: 0,
    packId: 0,
    cookies: useCookies(),

    nextTime: 0,
    modal: false,

    currentTime: Date.now(),
  }),
  mutations: {
    setCards(state: any, newCards: any) {
      state.cards = newCards;
    },
    setCurrentCard(state: any, newCard: any) {
      state.currentCard = newCard;
    },
    setCount(state: any, count: number) {
      state.count = count;
    },
    setCurrent(state: any, current: number) {
      state.current = current;
    },
    setShowAnswer(state: any, showAnswer: boolean) {
      state.showAnswer = showAnswer;
    },
    setUserId(state: any, userId: number) {
      state.userId = userId;
    },
    setPackId(state: any, packId: number) {
      state.packId = packId;
    },
    setNextTime(state: any, nextTime: number) {
      state.nextTime = nextTime;
    },
    setNewModal(state: any, newModal: boolean) {
      state.modal = newModal;
    },
    setCurrentTime(state: any, newTime: number) {
      state.currentTime = newTime;
    },
  },
  actions: {
    changeModal({ state, commit }: any, data: boolean) {
      commit("setNewModal", data);
    },
    async forceStart({ state, dispatch, commit }: any) {
      const log = await axios({
        url: "http://localhost:3000/pack/" + state.packId + "/card/count?",
        method: "get",
      });

      for (const card of log.data) {
        await axios({
          url:
            "http://localhost:3000/pack/" +
            state.packId +
            "/card/" +
            card.id +
            "/grade/" +
            state.userId +
            "/reset",
          method: "patch",
          headers: {
            Authorization:
              "Bearer " + state.cookies.cookies.get("access_token"),
          },
        });
      }

      commit("setNewModal", false);
      commit("setCurrentTime", Date.now());

      dispatch("getCards");
    },
    async getUserAndPack({ commit, state }: any, packId: number) {
      const token = state.cookies.cookies.get("access_token");
      if (token) {
        const id: number = Object(jwtDecode(token)).id;
        commit("setUserId", id);
      }
      commit("setPackId", packId);

      const nextTime = await axios({
        url:
          "http://localhost:3000/pack/" +
          state.packId +
          "/card/next?userId=" +
          state.userId,
        method: "get",
      });

      commit("setNextTime", nextTime.data);
    },
    async getCards({ commit, state }: any) {
      const log = await axios({
        url:
          "http://localhost:3000/pack/" +
          state.packId +
          "/card/learn?userId=" +
          state.userId,
        method: "get",
      });
      commit("setCards", log.data.rows);
      commit("setCount", log.data.count);

      if (state.count > 0) {
        commit("setCurrentCard", state.cards[state.current]);
        commit("setNextTime", 2 * state.currentTime);
      }
    },
    showAnswer({ commit }: any) {
      commit("setShowAnswer", true);
    },
    async setNewGrade({ state, dispatch, commit }: any, newGrade: number) {
      let nextTime: number = state.currentTime;

      switch (newGrade) {
        case 1:
          nextTime += 1000 * 60;
          break;
        case 2:
          nextTime += 1000 * 60 * 10;
          break;
        case 3:
          nextTime += 1000 * 60 * 60;
          break;
        case 4:
          nextTime += 1000 * 60 * 60 * 5;
          break;
        default:
          nextTime += 1000 * 60 * 60 * 24;
          break;
      }

      if (nextTime < state.nextTime) {
        commit("setNextTime", nextTime);
      }

      await axios({
        url:
          "http://localhost:3000/pack/" +
          state.packId +
          "/card/" +
          state.currentCard.id +
          "/grade/" +
          state.userId,
        method: "patch",
        data: {
          grade: newGrade,
          nextTime: nextTime,
        },
        headers: {
          Authorization: "Bearer " + state.cookies.cookies.get("access_token"),
        },
      });

      dispatch("nextQuestion");
    },
    nextQuestion({ commit, state }: any) {
      commit("setCurrent", state.current + 1);
      if (state.current < state.count) {
        commit("setCurrentCard", state.cards[state.current]);
      } else {
        commit("setCards", []);
      }
      commit("setShowAnswer", false);
    },
  },
  namespaced: true,
};
