<template>
  <div class="container">
    <div class="flex-start-end">
      <div>
        <h4>{{ packName }}</h4>
      </div>
      <div>
        <BRow>
          <BCol v-if="cards.length > 0" class="col-margin">
            <BButton
              :href="'/pack/' + packId + '/learning'"
              variant="outline-primary"
              >Изучение</BButton
            >
          </BCol>
          <BCol>
            <BButton
              v-if="isAdmin || userId == authorId"
              :href="'/pack/' + packId + '/card/new'"
              variant="outline-primary"
              >Создать карточку</BButton
            >
          </BCol>
        </BRow>
      </div>
    </div>
    <hr />
    <div class="flex-start-end">
      <div>
        <BRow>
          <BCol class="col-margin">
            <BFormInput
              class="search-input"
              placeholder="Название карточки"
              v-model="search"
            />
          </BCol>
          <BCol class="col-margin">
            <BButton
              variant="outline-secondary"
              @click="
                currentPage = 1;
                changeCardName(search);
              "
              >Поиск</BButton
            >
          </BCol>
          <BCol class="col-margin">
            <BButton
              variant="outline-secondary"
              @click="
                search = '';
                currentPage = 1;
                changeCardName('');
              "
              >Очистить</BButton
            >
          </BCol>
        </BRow>
      </div>
      <div>
        <BCol>
          <BDropdown class="col-margin" variant="outline-secondary" text="Дата">
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
      </div>
    </div>
    <hr />

    <BTableSimple hover responsive class="table-color">
      <BThead>
        <BTr>
          <BTh>Вопрос</BTh>
          <BTh>Ответ</BTh>
          <BTh>Дата</BTh>
          <BTh>Оценка</BTh>
          <BTh>Действия</BTh>
        </BTr>
      </BThead>
      <BTbody>
        <h4 v-if="isLoading">Идет загрузка...</h4>
        <card-item v-for="card in cards" :key="card.id" :card="card" />
      </BTbody>
    </BTableSimple>
    <h3 class="error-color" v-if="cards.length == 0 && !isLoading">
      Карточки отсутствуют...
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
import CardItem from "@/components/card/CardItem.vue";
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";

export default defineComponent({
  components: { CardItem },
  data() {
    return {
      search: "",
      currentPage: 1,
    };
  },
  methods: {
    ...mapActions({
      changeCardName: "cardList/changePackName",
      changeSort: "cardList/changeSort",
      changePage: "cardList/changePage",

      getCards: "cardList/getCards",
      getUserAndPack: "cardList/getUserAndPack",
    }),
  },
  computed: {
    ...mapState({
      cards: (state: any) => state.cardList.cards,
      rows: (state: any) => state.cardList.row,
      isLoading: (state: any) => state.cardList.isLoading,
      page: (state: any) => state.cardList.page,
      sort: (state: any) => state.cardList.sort,

      packName: (state: any) => state.cardList.packName,
      packId: (state: any) => state.cardList.packId,
      authorId: (state: any) => state.cardList.authorId,

      userId: (state: any) => state.cardList.userId,
      isAdmin: (state: any) => state.cardList.isAdmin,
    }),
  },
  mounted() {
    this.getUserAndPack(this.$route.params.packId);
  },
});
</script>
<style scoped>
.table-color {
  background: #f8f8f8;
  padding: 10px;
  margin-bottom: 0;
}
.flex-start-end {
  display: flex;
  justify-content: space-between;
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
</style>
