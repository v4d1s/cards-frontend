import { createStore } from "vuex";
import { cardItemModule } from "@/store/card/cardItemModule";
import { cardInputModule } from "@/store/card/cardInputModule";
import { cardListModule } from "@/store/card/cardListModule";
import { packItemModule } from "@/store/pack/packItemModule";
import { packListModule } from "@/store/pack/packListModule";
import { packLearningModule } from "@/store/pack/packLearningModule";
import { authLoginModule } from "@/store/auth/authLoginModule";
import { authRegisterModule } from "@/store/auth/authRegisterModule";

export default createStore({
  modules: {
    cardItem: cardItemModule,
    cardInput: cardInputModule,
    cardList: cardListModule,

    packItem: packItemModule,
    packList: packListModule,
    packLearning: packLearningModule,

    authLogin: authLoginModule,
    authRegister: authRegisterModule,
  },
});
