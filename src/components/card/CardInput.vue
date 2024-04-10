<template>
  <BForm>
    <BFormGroup id="input-group-1">
      <div class="flex-start-end">
        <h6>Введите вопрос:</h6>
      </div>
      <textarea
        id="input-1"
        placeholder="Вопрос"
        class="textarea-input"
        required
      ></textarea>
    </BFormGroup>
    <hr />
    <BFormGroup id="input-group-2">
      <div class="flex-start-end">
        <h6>Введите ответ:</h6>
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
          class="textarea-input"
          required
        ></textarea>
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
