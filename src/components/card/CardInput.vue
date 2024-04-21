<template>
  <BForm @submit="changeCard">
    <BFormGroup id="input-group-1">
      <div class="flex-start-end">
        <h5>Введите вопрос:</h5>
        <div class="hint-text">"\ " — пробел, "\\ " — новая строка</div>
      </div>
      <textarea
        id="input-1"
        placeholder="Вопрос"
        class="textarea-input"
        v-model="userData.question"
        required
      ></textarea>
      <hr />
      <vue-latex :expression="userData.question" display-mode />
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
          v-model="userData.inputSelect"
        />
      </div>
      <div v-if="userData.inputSelect == 0">
        <textarea
          id="input-2"
          placeholder="Ответ"
          v-model="userData.answer"
          class="textarea-input"
          required
        ></textarea>
        <hr />
        <vue-latex :expression="userData.answer" display-mode />
      </div>
      <div v-if="userData.inputSelect == 1">
        <div v-if="userData.url" class="preview-image">
          <div>
            <BImg :src="userData.url" fluid />
          </div>
          <div>
            <BButton variant="outline-danger" @click="userData.url = ''"
              >Изменить фото</BButton
            >
          </div>
        </div>
        <input
          v-else
          type="file"
          accept="image/*"
          @change="onFileChange($event)"
          required
        />
      </div>
    </BFormGroup>
    <hr />
    <BRow>
      <BCol>
        <BButton v-if="userId != 0" type="submit" variant="success"
          >Готово</BButton
        >
      </BCol>
      <BCol>
        <BButton :href="'/pack/' + $route.params.packId" variant="danger"
          >Отменить</BButton
        >
      </BCol>
    </BRow>
  </BForm>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";

export default defineComponent({
  props: {
    oldCardId: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    ...mapState({
      userData: (state: any) => state.cardInput.userData,
      userId: (state: any) => state.cardInput.userId,

      inputMode: (state: any) => state.cardInput.inputMode,
    }),
  },
  methods: {
    ...mapActions({
      setUserAndPack: "cardInput/setUserAndPack",
      setData: "cardInput/setData",
      onFileChange: "cardInput/onFileChange",
      changeCard: "cardInput/changeCard",
    }),
  },
  mounted() {
    this.setUserAndPack(parseInt(this.$route.params.packId[0]));
    this.setData(this.oldCardId);
  },
});
</script>

<style scoped>
.textarea-input {
  width: 100%;
  min-height: 50px;
  max-height: 600px;
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
  margin-top: 10px;
}
</style>
