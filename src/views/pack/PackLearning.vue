<template>
  <div class="container">
    <div class="background">
      <!--      TODO есть ли вопросы?-->
      <div v-if="true">
        <div>
          <h5 id="question">ВОПРОС ЗДЕСЬ!!!!</h5>
        </div>
        <hr />
        <div v-if="!showAnswerButton">
          <BButton
            v-model="showAnswerButton"
            @click="answerButtonClick"
            variant="outline-primary"
            >Показать ответ</BButton
          >
        </div>
        <div v-if="showAnswerButton">
          <h5 id="answer">ОТВЕТ ЗДЕСЬ!!!</h5>
          <hr />
          <h5>Оцените свой ответ</h5>
          <BRow>
            <BCol>
              <BButton
                class="button-margin"
                @click="gradeClick(1)"
                variant="outline-danger"
                >Не знаю</BButton
              >
              <BButton
                class="button-margin"
                @click="gradeClick(2)"
                variant="outline-warning"
                >Плохо</BButton
              >
              <BButton
                class="button-margin"
                @click="gradeClick(3)"
                variant="outline-secondary"
                >Нормально</BButton
              >
              <BButton
                class="button-margin"
                @click="gradeClick(4)"
                variant="outline-primary"
                >Хорошо</BButton
              >
              <BButton
                class="button-margin"
                @click="gradeClick(5)"
                variant="outline-success"
                >Отлично</BButton
              >
            </BCol>
          </BRow>
        </div>
      </div>
      <div v-else>
        <h5>Вопросы отутствуют!</h5>
        <!--        TODO next time, if exist-->
        <div v-if="true">
          <BRow>
            <BCol><h6>Вопросы будут доступны:</h6></BCol>
            <BCol><h6>some time</h6></BCol>
          </BRow>
          <BButton variant="outline-danger">Принудительно начать!</BButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      showAnswerButton: false,
      grade: 0,
    };
  },
  methods: {
    answerButtonClick() {
      this.showAnswerButton = true;
    },
    gradeClick(grade: number) {
      // this.grade = grade;
      this.showAnswerButton = false;
    },
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
</style>
