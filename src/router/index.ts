import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import LoginView from "@/views/auth/LoginView.vue";
import RegisterView from "@/views/auth/RegisterView.vue";
import PackList from "@/views/pack/PackList.vue";
import CardList from "@/views/card/CardList.vue";
import CardNewItem from "@/views/card/CardNewItem.vue";
import CardEditItem from "@/views/card/CardEditItem.vue";
import PackLearning from "@/views/pack/PackLearning.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/packs",
    name: "PacksList",
    component: PackList,
  },
  {
    path: "/pack/:packId",
    name: "CardsList",
    component: CardList,
  },
  {
    path: "/pack/:packId/card/new",
    name: "CardNewItem",
    component: CardNewItem,
  },
  {
    path: "/pack/:packId/card/:cardId/edit",
    name: "CardEdit",
    component: CardEditItem,
  },
  {
    path: "/pack/:packId/learning",
    name: "PackLearning",
    component: PackLearning,
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/packs",
  },
  {
    path: "/",
    redirect: "/packs",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
