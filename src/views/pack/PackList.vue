<template>
  <div class="container">
    <div class="flex-start-end">
      <div>
        <h4>Набор карточек</h4>
      </div>
      <div>
        <!--        TODO проверка на пустоту во всех модальных окнах!!!-->
        <BButton @click="changeModal(true)" variant="outline-primary"
          >Создать набор</BButton
        >
        <BModal
          centered
          v-model="newPackModal"
          title="Новый набор"
          hide-header-close
          hideFooter
        >
          <BForm @submit="createPack(newPack)">
            <BFormInput
              class="col-margin"
              id="input-1"
              v-model="newPack"
              placeholder="Название"
              required
              @input="updateNewPack"
            />
            <div class="flex-start-end">
              <div>
                <BButton type="submit" variant="outline-primary"
                  >Создать</BButton
                >
              </div>
              <div>
                <BButton @click="changeModal(false)" variant="outline-danger"
                  >Отменить</BButton
                >
              </div>
            </div>
          </BForm>
        </BModal>
      </div>
    </div>
    <hr />
    <div class="flex-start-end">
      <div>
        <BCol class="col-margin">
          <BFormInput class="search-input" placeholder="Название набора" />
        </BCol>
      </div>
      <div>
        <BRow>
          <BCol class="col-margin">
            <BDropdown variant="outline-secondary" text="Дата">
              <BDropdownItem>По убыванию</BDropdownItem>
              <BDropdownItem>По возрастанию</BDropdownItem>
            </BDropdown>
          </BCol>
          <BCol class="col-margin">
            <BDropdown variant="outline-secondary" text="Количество карточек">
              <BDropdownItem>По убыванию</BDropdownItem>
              <BDropdownItem>По возрастанию</BDropdownItem>
            </BDropdown>
          </BCol>
          <BCol v-if="true" class="col-margin">
            <BButtonGroup>
              <BButton variant="outline-secondary">Свои</BButton>
              <BButton variant="outline-secondary">Общие</BButton>
            </BButtonGroup>
          </BCol>
          <BCol v-else class="col-margin">
            <BButtonGroup>
              <BButton variant="outline-secondary">Все </BButton>
              <BButton variant="outline-secondary">Общие</BButton>
              <BButton variant="outline-secondary">Приватные</BButton>
            </BButtonGroup>
          </BCol>
        </BRow>
      </div>
    </div>
    <hr />

    <!--    TODO Pack's list-->
    <BTableSimple hover responsive class="table-color">
      <BThead>
        <BTr>
          <BTh>Название</BTh>
          <BTh>Автор</BTh>
          <BTh>Дата создания</BTh>
          <BTh>Количество карточек</BTh>
          <BTh>Действия</BTh>
        </BTr>
      </BThead>
      <BTbody>
        <pack-item v-for="pack in packs" :key="pack.id" :pack="pack" />
      </BTbody>
    </BTableSimple>
    <h3 class="error-color" v-if="packs.length == 0">
      Наборы с карточками отсутствуют...
    </h3>

    <!--    TODO Pagination-->
    <BPagination
      v-else
      align="center"
      :total-rows="rows"
      :per-page="10"
      first-text="<<"
      prev-text="<"
      next-text=">"
      last-text=">>"
    />
  </div>
</template>

<script lang="ts">
import PackItem from "@/components/pack/PackItem.vue";
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";

export default defineComponent({
  data() {
    return {
      newPack: "",
    };
  },
  components: { PackItem },
  methods: {
    ...mapActions({
      changeModal: "packList/changeModal",
      updateNewPack: "packList/updateNewPack",
      createPack: "packList/createPack",

      getPacksDefault: "packList/getPacksDefault",
    }),
  },
  computed: {
    ...mapState({
      newPackModal: (state: any) => state.packList.newPackModal,
      packs: (state: any) => state.packList.packs,
      rows: (state: any) => state.packList.row,
    }),
  },
  mounted() {
    this.getPacksDefault();
  },
});
</script>

<style scoped>
.table-color {
  background: #f8f8f8;
  padding: 10px;
  margin-bottom: 0;
}
.error-color {
  background: #f8f8f8;
  padding: 10px;
  margin-bottom: 10px;
}
.search-input {
  min-width: 200px;
  max-width: 400px;
}
.col-margin {
  margin-bottom: 10px;
}
.flex-start-end {
  display: flex;
  justify-content: space-between;
}
</style>
