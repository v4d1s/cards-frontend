<template>
  <div class="container">
    <BBreadcrumb>
      <BBreadcrumbItem href="/packs"> Вернуться назад </BBreadcrumbItem>
      <BBreadcrumbItem :href="'/pack/' + packId"
        >К списку вопросов</BBreadcrumbItem
      >
    </BBreadcrumb>
    <div class="background">
      <BOverlay :show="isLoading" rounded="sm">
        <h4 v-if="isLoading">Идет загрузка...</h4>
        <div v-if="count > 0 && current < count">
          <div>
            <vue-latex
              :expression="'\\text{' + currentCard.question + '}'"
              display-mode
            />
          </div>
          <hr />
          <div v-if="!showAnswerButton">
            <BButton
              v-model="showAnswerButton"
              @click="showAnswer"
              variant="outline-primary"
              >Показать ответ</BButton
            >
          </div>
          <div v-if="showAnswerButton">
            <vue-latex
              v-if="currentCard.image == ''"
              :expression="currentCard.answer"
              display-mode
            />
            <BImg
              v-if="currentCard.image != ''"
              class="image"
              fluid
              :src="backend + currentCard.image"
            />
            <hr />
            <h5>Оцените свой ответ</h5>
            <BRow>
              <BCol>
                <BButton
                  class="button-margin"
                  @click="setNewGrade(1)"
                  variant="outline-danger"
                  >Не знаю</BButton
                >
                <BButton
                  class="button-margin"
                  @click="setNewGrade(2)"
                  variant="outline-warning"
                  >Плохо</BButton
                >
                <BButton
                  class="button-margin"
                  @click="setNewGrade(3)"
                  variant="outline-secondary"
                  >Нормально</BButton
                >
                <BButton
                  class="button-margin"
                  @click="setNewGrade(4)"
                  variant="outline-primary"
                  >Хорошо</BButton
                >
                <BButton
                  class="button-margin"
                  @click="setNewGrade(5)"
                  variant="outline-success"
                  >Отлично</BButton
                >
              </BCol>
            </BRow>
          </div>
        </div>
        <div v-else>
          <div v-if="nextTime > 0">
            <BRow>
              <BCol><h6>Вопросы будут доступны:</h6></BCol>
              <BCol
                ><h6>{{ new Date(nextTime) }}</h6></BCol
              >
            </BRow>
            <BButton variant="outline-danger" @click="changeModal(true)"
              >Сбросить таймеры</BButton
            >
            <BModal
              centered
              v-model="modal"
              title="Точно сбросить?"
              hide-header-close
              hideFooter
            >
              <p>
                Вы действительно хотите сбросить свои таймеры? Это может плохо
                сказаться на обучении!
              </p>
              <div class="flex-start-end">
                <div>
                  <BButton @click="forceStart" variant="outline-primary"
                    >Начать</BButton
                  >
                </div>
                <div>
                  <BButton @click="changeModal(false)" variant="outline-danger"
                    >Отменить</BButton
                  >
                </div>
              </div>
            </BModal>
          </div>
        </div>
      </BOverlay>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";

export default defineComponent({
  data() {
    return {
      backend: process.env.VUE_APP_BACKEND,
    };
  },
  methods: {
    ...mapActions({
      getUserAndPack: "packLearning/getUserAndPack",
      getCards: "packLearning/getCards",
      showAnswer: "packLearning/showAnswer",
      setNewGrade: "packLearning/setNewGrade",
      nextQuestion: "packLearning/nextQuestion",
      changeModal: "packLearning/changeModal",
      forceStart: "packLearning/forceStart",
    }),
  },
  computed: {
    ...mapState({
      cards: (state: any) => state.packLearning.cards,
      currentCard: (state: any) => state.packLearning.currentCard,
      count: (state: any) => state.packLearning.count,
      current: (state: any) => state.packLearning.current,
      showAnswerButton: (state: any) => state.packLearning.showAnswer,
      userId: (state: any) => state.packLearning.userId,
      packId: (state: any) => state.packLearning.packId,
      nextTime: (state: any) => state.packLearning.nextTime,
      modal: (state: any) => state.packLearning.modal,
      isLoading: (state: any) => state.packLearning.isLoading,
    }),
  },
  async mounted() {
    this.$nextTick(await this.getUserAndPack(this.$route.params.packId));
    this.$nextTick(await this.getCards());
  },
});
</script>
<style scoped>
.background {
  background: #f8f8f8;
  padding: 25px;
}
.button-margin {
  margin: 10px;
}

.flex-start-end {
  display: flex;
  justify-content: space-between;
}
</style>
