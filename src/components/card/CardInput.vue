<template>
  <BForm>
    <BFormGroup id="input-group-1">
      <div class="flex-start-end">
        <h5>Введите вопрос:</h5>
        <div class="hint-text">"\ " — пробел, "\\ " — новая строка</div>
      </div>
      <textarea
        id="input-1"
        placeholder="Вопрос"
        class="textarea-input"
        v-model="question"
        required
      ></textarea>
      <hr />
      <vue-latex :expression="question" display-mode />
    </BFormGroup>
    <hr />
    <BFormGroup id="input-group-2">
      <div class="flex-start-end">
        <h5>Введите ответ:</h5>
        <BFormSelect
          class="select-size"
          id="input-2"
          :options="inputMode"
          required
          v-model="inputSelect"
        />
      </div>
      <div v-if="inputSelect == 0">
        <textarea
          id="input-2"
          placeholder="Ответ"
          v-model="answer"
          class="textarea-input"
          required
        ></textarea>
        <hr />
        <vue-latex :expression="answer" display-mode />
      </div>
      <div v-if="inputSelect == 1">
        <input
          type="file"
          accept="image/jpeg, image/png, image/jpg"
          @change="onFileChange($event)"
          required
        />
        <div v-if="url" class="preview-image">
          <img :src="url" />
        </div>
      </div>
    </BFormGroup>
    <hr />
    <BRow>
      <!--      TODO href-->
      <BCol>
        <BButton type="submit" variant="success">Готово</BButton>
      </BCol>
      <BCol>
        <BButton href="/pack/1" variant="danger">Отменить</BButton>
      </BCol>
    </BRow>
  </BForm>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      inputMode: [
        { text: "Текст (LaTeX)", value: 0 },
        { text: "Фото", value: 1 },
      ],
      inputSelect: 0,
      url: "",
      question: "",
      answer: "",
    };
  },
  methods: {
    onFileChange(e: any) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
    },
  },
});
</script>

<style scoped>
.textarea-input {
  width: 100%;
  min-height: 50px;
}
.hint-text {
  color: rgba(0, 0, 0, 0.5);
}
.flex-start-end {
  display: flex;
  justify-content: space-between;
}
.select-size {
  width: 200px;
  margin-bottom: 10px;
}
.preview-image {
  max-height: 500px;
  margin-top: 10px;
}
</style>
