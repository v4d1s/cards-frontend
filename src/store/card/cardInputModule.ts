import axios from "axios";
import router from "@/router";
import { useCookies } from "vue3-cookies";
import { jwtDecode } from "jwt-decode";

export const cardInputModule = {
  state: () => ({
    inputMode: [
      { text: "Текст (LaTeX)", value: 0 },
      { text: "Фото", value: 1 },
    ],
    userData: {
      question: "",
      inputSelect: 0,
      url: "",
      answer: "",
    },
    newFile: null,
    image: "",
    userId: 0,
    packId: 0,
    cookies: useCookies(),
    oldCard: false,
  }),
  mutations: {
    setUserData(state: any, newUserData: any) {
      state.userData = newUserData;
    },
    setUserId(state: any, userId: number) {
      state.userId = userId;
    },
    setPackId(state: any, packId: number) {
      state.packId = packId;
    },
    setImage(state: any, image: any) {
      state.image = image;
    },
    setOldCard(state: any) {
      state.oldCard = true;
    },
    setNewFile(state: any, newFile: any) {
      state.newFile = newFile;
    },
  },
  actions: {
    setUserAndPack({ state, commit }: any, packId: number) {
      commit("setPackId", packId);

      if (state.cookies.cookies.get("access_token")) {
        const token = Object(
          jwtDecode(state.cookies.cookies.get("access_token"))
        );
        commit("setUserId", token.id);
      }
    },
    setData({ commit }: any, oldCard: any) {
      if (oldCard != null) {
        commit("setCardId", oldCard.id);
        commit("setOldCard");

        if (oldCard.image != "") {
          commit("setUserData", {
            question: oldCard.question,
            inputSelect: 1,
            url: oldCard.image,
            answer: "",
          });
          commit("setImage", oldCard.image);
        } else {
          commit("setUserData", {
            question: oldCard.question,
            inputSelect: 0,
            url: "",
            answer: oldCard.answer,
          });
        }
      }
    },
    onFileChange({ state, commit }: any, e: any) {
      const file = e.target.files[0];
      commit("setNewFile", file);
      state.userData.url = URL.createObjectURL(file);
    },
    async changeCard({ state, commit }: any) {
      if (state.oldCard) {
        // своеборазная проверка на новое фото
        // edit card
      } else {
        if (state.userData.url != "") {
          commit("setImage", state.newFile);
        }
        if (state.image != "") {
          await axios({
            url: "http://localhost:3000/pack/" + state.packId + "/card/new",
            method: "post",
            headers: {
              Authorization:
                "Bearer " + state.cookies.cookies.get("access_token"),
              "Content-Type": "multipart/form-data",
            },
            data: {
              packId: state.packId.toString(),
              userId: state.userId.toString(),
              question: state.userData.question,
              answer: state.userData.answer,
              image: state.image,
            },
          });
        } else {
          await axios({
            url: "http://localhost:3000/pack/" + state.packId + "/card/new",
            method: "post",
            headers: {
              Authorization:
                "Bearer " + state.cookies.cookies.get("access_token"),
            },
            data: {
              packId: state.packId.toString(),
              userId: state.userId.toString(),
              question: state.userData.question,
              answer: state.userData.answer,
            },
          });
        }
        await router.push("/pack/" + state.packId);
      }
    },
  },
  namespaced: true,
};
