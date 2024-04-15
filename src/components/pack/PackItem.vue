<template>
  <BTr>
    <BTh
      ><a :href="'/pack/' + pack.id">{{ pack.name }}</a></BTh
    >
    <BTd>{{ pack.user.name }}</BTd>
    <BTd>{{ pack.createdAt.split("T")[0] }}</BTd>
    <BTd>{{ pack.cardsCount }}</BTd>
    <BTd>
      <!--      TODO если залогинился, сделать иначе-->
      <BButton :href="'/pack/' + pack.id + '/learning'" variant="success"
        >Изучить</BButton
      >
      <!--        TODO Если админ / свой пак-->
      <div v-if="true">
        <BButton @click="modalEdit = !modalEdit" variant="warning"
          >Изменить</BButton
        >
        <BModal
          centered
          v-model="modalEdit"
          title="Изменить набор"
          hide-header-close
          hideFooter
          @hide.prevent
        >
          <BForm @submit="editPack">
            <BFormInput
              v-model="newName"
              type="text"
              class="col-margin"
              placeholder="Название"
              required
            />
            <BFormCheckbox
              switch
              v-model="newPrivate"
              variant="outline-primary"
              @click="newPrivate = !newPrivate"
            >
              Изменить видимость</BFormCheckbox
            >
            <div class="flex-start-end">
              <div>
                <BButton type="submit" variant="outline-primary"
                  >Изменить</BButton
                >
              </div>
              <div>
                <BButton @click="closeModalEdit" variant="outline-danger"
                  >Отменить</BButton
                >
              </div>
            </div>
          </BForm>
        </BModal>

        <BButton @click="modalDelete = !modalDelete" variant="danger"
          >Удалить</BButton
        >
        <BModal
          hide-header-close
          hideFooter
          centered
          v-model="modalDelete"
          @hide.prevent
          title="Удалить набор?"
        >
          <p>
            Вы действительно хотите удалить набор
            <strong>{{ pack.name }}</strong>
            ?
          </p>
          <div class="flex-start-end">
            <div>
              <BButton @click="deletePack" variant="outline-danger"
                >Удалить</BButton
              >
            </div>
            <div>
              <BButton
                @click="modalDelete = !modalDelete"
                variant="outline-secondary"
                >Отменить</BButton
              >
            </div>
          </div>
        </BModal>
      </div>
    </BTd>
  </BTr>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useCookies } from "vue3-cookies";

export default defineComponent({
  props: {
    pack: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      modalEdit: false,
      modalDelete: false,

      newName: this.pack.name,
      newPrivate: false,

      cookies: useCookies(),
      isLogin: false,
      isAuthor: false,
    };
  },
  methods: {
    // TODO функционал кнопок
    editPack() {
      console.log("1");
    },
    deletePack() {
      console.log("1");
    },
    closeModalEdit() {
      this.modalEdit = false;
      this.newPrivate = false;
      this.newName = this.pack.name;
    },
    // TODO функция на наличие в куках (добавить в куки пункт isAdmin)
  },
});
</script>

<style scoped>
.flex-start-end {
  display: flex;
  justify-content: space-between;
}
.col-margin {
  margin-bottom: 10px;
}
.pack-item {
  background: #f8f8f8;
  padding: 10px;
  margin-bottom: 10px;
}
</style>
