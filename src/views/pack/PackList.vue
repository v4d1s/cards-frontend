<template>
  <div class="container">
    <div class="flex-start-end">
      <div>
        <h4>Набор карточек</h4>
      </div>
      <div>
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
        <BRow>
          <BCol class="col-margin">
            <BFormInput
              class="search-input"
              placeholder="Название набора"
              v-model="search"
            />
          </BCol>
          <BCol class="col-margin">
            <BButton variant="outline-secondary" @click="changePackName(search)"
              >Поиск</BButton
            >
          </BCol>
          <BCol class="col-margin">
            <BButton
              variant="outline-secondary"
              @click="
                search = '';
                changePackName('');
              "
              >Очистить</BButton
            >
          </BCol>
        </BRow>
      </div>
      <div>
        <BRow>
          <BCol class="col-margin">
            <BDropdown variant="outline-secondary" text="Дата">
              <BDropdownItem active v-if="sort == '0updated'"
                >По убыванию</BDropdownItem
              >
              <BDropdownItem v-else @click="changeSort('0updated')"
                >По убыванию</BDropdownItem
              >

              <BDropdownItem active v-if="sort == '1updated'"
                >По возрастанию</BDropdownItem
              >
              <BDropdownItem v-else @click="changeSort('1updated')"
                >По возрастанию</BDropdownItem
              >
            </BDropdown>
          </BCol>
          <BCol class="col-margin">
            <BDropdown variant="outline-secondary" text="Количество карточек">
              <BDropdownItem active v-if="sort == '0cardsCount'"
                >По убыванию</BDropdownItem
              >
              <BDropdownItem v-else @click="changeSort('0cardsCount')"
                >По убыванию</BDropdownItem
              >

              <BDropdownItem active v-if="sort == '1cardsCount'"
                >По возрастанию</BDropdownItem
              >
              <BDropdownItem v-else @click="changeSort('1cardsCount')"
                >По возрастанию</BDropdownItem
              >
            </BDropdown>
          </BCol>
          <BCol v-if="userId > 0 && !isAdmin" class="col-margin">
            <BButtonGroup>
              <BButton
                :pressed="'true'"
                v-if="visible == 'private'"
                variant="outline-secondary"
                >Свои</BButton
              >
              <BButton
                v-else
                variant="outline-secondary"
                @click="changeVisibility('private')"
                >Свои</BButton
              >

              <BButton
                :pressed="'true'"
                v-if="visible == 'general'"
                variant="outline-secondary"
                >Общие</BButton
              >
              <BButton
                v-else
                variant="outline-secondary"
                @click="changeVisibility('general')"
                >Общие</BButton
              >
            </BButtonGroup>
          </BCol>
          <BCol v-if="isAdmin" class="col-margin">
            <BButtonGroup>
              <BButton
                :pressed="'true'"
                v-if="visible == 'general'"
                variant="outline-secondary"
                >Все</BButton
              >
              <BButton
                v-else
                variant="outline-secondary"
                @click="changeVisibility('all')"
                >Все</BButton
              >

              <BButton
                :pressed="'true'"
                v-if="visible == 'private_all'"
                variant="outline-secondary"
                >Приватные</BButton
              >
              <BButton
                v-else
                variant="outline-secondary"
                @click="changeVisibility('private_all')"
                >Приватные</BButton
              >

              <BButton
                :pressed="'true'"
                v-if="visible == 'general'"
                variant="outline-secondary"
                >Общие</BButton
              >
              <BButton
                v-else
                variant="outline-secondary"
                @click="changeVisibility('general')"
                >Общие</BButton
              >
            </BButtonGroup>
          </BCol>
        </BRow>
      </div>
    </div>
    <hr />

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
        <h4 v-if="isLoading">Идет загрузка...</h4>
        <pack-item v-for="pack in packs" :key="pack.id" :pack="pack" />
      </BTbody>
    </BTableSimple>
    <h3 class="error-color" v-if="packs.length == 0 && !isLoading">
      Наборы с карточками отсутствуют...
    </h3>

    <BPagination
      v-else
      align="center"
      :total-rows="rows"
      :per-page="10"
      v-model="currentPage"
      @click="changePage(currentPage)"
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
      search: "",
      currentPage: 1,
    };
  },
  components: { PackItem },
  methods: {
    ...mapActions({
      changeModal: "packList/changeModal",
      updateNewPack: "packList/updateNewPack",
      createPack: "packList/createPack",

      changePackName: "packList/changePackName",
      changeVisibility: "packList/changeVisibility",
      changeSort: "packList/changeSort",
      changePage: "packList/changePage",

      getPacks: "packList/getPacks",
      getUserId: "packList/getUserId",
    }),
  },
  computed: {
    ...mapState({
      newPackModal: (state: any) => state.packList.newPackModal,
      packs: (state: any) => state.packList.packs,
      rows: (state: any) => state.packList.row,
      isLoading: (state: any) => state.packList.isLoading,
      page: (state: any) => state.packList.page,
      visible: (state: any) => state.packList.visible,
      sort: (state: any) => state.packList.sort,
      userId: (state: any) => state.packList.userId,
      isAdmin: (state: any) => state.packList.isAdmin,
    }),
  },
  mounted() {
    this.getPacks();
    this.getUserId();
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
