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

    oldCardId: 0,
    oldCard: null,
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
    setOldCardId(state: any, oldCardId: number) {
      state.oldCardId = oldCardId;
    },
    setOldCard(state: any, oldCard: any) {
      state.oldCard = oldCard;
    },
    setNewFile(state: any, newFile: any) {
      state.newFile = newFile;
    },
  },
  actions: {
    async setUserAndPack({ state, commit }: any, packId: number) {
      const response = await axios({
        url: process.env.VUE_APP_BACKEND + "pack/" + packId,
        method: "get",
      });
      if (response.data == "") {
        router.go(-1);
        return;
      }

      commit("setPackId", parseInt(String(packId)));

      if (state.cookies.cookies.get("access_token")) {
        const token = Object(
          jwtDecode(state.cookies.cookies.get("access_token"))
        );
        commit("setUserId", token.id);
      }
    },
    async setData({ state, commit }: any, oldCardId: number) {
      if (oldCardId != 0) {
        commit("setOldCardId", parseInt(String(oldCardId)));

        const card = await axios({
          url:
            process.env.VUE_APP_BACKEND +
            "pack/" +
            state.packId +
            "/card/" +
            state.oldCardId +
            "/?userId=" +
            state.userId,
          method: "get",
        });

        if (card.data == "") {
          router.go(-1);
          return;
        }
        commit("setPackId", card.data.packId);

        commit("setOldCard", card.data);

        if (state.oldCard.image != "") {
          commit("setUserData", {
            question: state.oldCard.question,
            inputSelect: 1,
            url: process.env.VUE_APP_BACKEND + state.oldCard.image,
            answer: "",
          });
          commit("setImage", state.oldCard.image);
        } else {
          commit("setUserData", {
            question: state.oldCard.question,
            inputSelect: 0,
            url: "",
            answer: state.oldCard.answer,
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
        if (state.userData.inputSelect == 1) {
          if (state.userData.url != state.oldCard.image) {
            commit("setImage", state.newFile);
            await axios({
              url:
                process.env.VUE_APP_BACKEND +
                "pack/" +
                state.packId +
                "/card/" +
                state.oldCardId,
              method: "patch",
              headers: {
                Authorization:
                  "Bearer " + state.cookies.cookies.get("access_token"),
                "Content-Type": "multipart/form-data",
              },
              data: {
                question: state.userData.question,
                answer: state.userData.answer,
                image: state.newFile,
              },
            });
          } else {
            await axios({
              url:
                process.env.VUE_APP_BACKEND +
                "pack/" +
                state.packId +
                "/card/" +
                state.oldCardId,
              method: "patch",
              headers: {
                Authorization:
                  "Bearer " + state.cookies.cookies.get("access_token"),
                "Content-Type": "multipart/form-data",
              },
              data: {
                question: state.userData.question,
                answer: state.userData.answer,
                image: state.oldCard.image,
              },
            });
          }
        } else {
          await axios({
            url:
              process.env.VUE_APP_BACKEND +
              "pack/" +
              state.packId +
              "/card/" +
              state.oldCardId,
            method: "patch",
            headers: {
              Authorization:
                "Bearer " + state.cookies.cookies.get("access_token"),
            },
            data: {
              question: state.userData.question,
              answer: state.userData.answer,
            },
          });
        }
      } else {
        if (state.userData.inputSelect == 1) {
          if (state.userData.url != "") {
            commit("setImage", state.newFile);
          }
          await axios({
            url:
              process.env.VUE_APP_BACKEND +
              "pack/" +
              state.packId +
              "/card/new",
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
            url:
              process.env.VUE_APP_BACKEND +
              "pack/" +
              state.packId +
              "/card/new",
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
      }
      await router.push("/pack/" + state.packId);
    },
  },
  namespaced: true,
};
