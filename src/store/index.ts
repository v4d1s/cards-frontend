import { createStore } from "vuex";
import { cardInputModule } from "@/store/card/cardInputModule";
import { cardListModule } from "@/store/card/cardListModule";
import { packListModule } from "@/store/pack/packListModule";
import { packLearningModule } from "@/store/pack/packLearningModule";
import { authLoginModule } from "@/store/auth/authLoginModule";
import { authRegisterModule } from "@/store/auth/authRegisterModule";
import { authLogOutModule } from "@/store/auth/authLogOutModule";

export default createStore({
  modules: {
    cardInput: cardInputModule,
    cardList: cardListModule,

    packList: packListModule,
    packLearning: packLearningModule,

    authLogin: authLoginModule,
    authRegister: authRegisterModule,
    authLogOut: authLogOutModule,
  },
});
