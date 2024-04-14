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
        <BButton
          @click="
            changeModalEdit({
              payload: true,
              oldName: pack.name,
              newPrivate: false,
            })
          "
          variant="warning"
          >Изменить</BButton
        >
        <BModal
          centered
          v-model="modalEdit"
          title="Изменить набор"
          hide-header-close
          hideFooter
        >
          <BFormInput
            v-model="newName"
            class="col-margin"
            placeholder="Название"
            required
          />
          <BFormCheckbox v-model="newPrivate" @click="changeNewPrivate">
            Изменить приватность?
          </BFormCheckbox>
          <div class="flex-start-end">
            <div>
              <!--                  TODO функционал кнопки-->
              <BButton
                @click="
                  changeModalEdit({
                    payload: false,
                    oldName: '',
                    newPrivate: false,
                  })
                "
                variant="outline-primary"
                >Изменить</BButton
              >
            </div>
            <div>
              <BButton
                @click="
                  changeModalEdit({
                    payload: false,
                    oldName: '',
                    newPrivate: false,
                  })
                "
                variant="outline-danger"
                >Отменить</BButton
              >
            </div>
          </div>
        </BModal>

        <BButton @click="changeModalDelete(true)" variant="danger"
          >Удалить</BButton
        >
        <BModal
          hide-header-close
          hideFooter
          centered
          v-model="modalDelete"
          title="Удалить набор?"
        >
          <p>
            Вы действительно хотите удалить набор
            <strong>{{ pack.name }}</strong>
            ?
          </p>
          <div class="flex-start-end">
            <div>
              <!--                  TODO функционал кнопки-->
              <BButton
                @click="changeModalDelete(false)"
                variant="outline-danger"
                >Удалить</BButton
              >
            </div>
            <div>
              <BButton
                @click="changeModalDelete(false)"
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
import { mapActions, mapState } from "vuex";

export default defineComponent({
  props: {
    pack: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapActions({
      changeModalDelete: "packItem/changeModalDelete",
      changeModalEdit: "packItem/changeModalEdit",
      changeNewPrivate: "packItem/changeNewPrivate",
    }),
  },
  computed: {
    ...mapState({
      modalDelete: (state: any) => state.packItem.modalDelete,
      modalEdit: (state: any) => state.packItem.modalEdit,
      newName: (state: any) => state.packItem.newName,
      newPrivate: (state: any) => state.packItem.newPrivate,
    }),
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
