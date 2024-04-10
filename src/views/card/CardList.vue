<template>
  <div class="container">
    <div class="flex-start-end">
      <div>
        <!--        TODO Название пака-->
        <h4>НАЗВАНИЕ ПАКА</h4>
      </div>
      <div>
        <BButton variant="outline-primary">Создать карточку</BButton>
      </div>
    </div>
    <hr />
    <div class="flex-start-end">
      <div>
        <BFormInput class="search-input" placeholder="Вопрос карточки" />
      </div>
      <div>
        <BDropdown variant="outline-secondary" text="Дата">
          <BDropdownItem href="#" active="true">По возрастанию</BDropdownItem>
          <BDropdownItem href="#">По убыванию</BDropdownItem>
        </BDropdown>
      </div>
    </div>
    <hr />

    <!--    TODO Сард's list-->
    <BTableSimple hover responsive class="table-color">
      <BThead>
        <BTr>
          <BTh>Вопрос</BTh>
          <BTh>Ответ</BTh>
          <BTh>Дата создания</BTh>
          <BTh>Оценка</BTh>
          <BTh>Действия</BTh>
        </BTr>
      </BThead>
      <BTbody>
        <card-item />
        <card-item />
        <card-item />
      </BTbody>
    </BTableSimple>

    <!--    TODO Pagination-->
    <BPagination
      align="center"
      :total-rows="1337"
      :per-page="1337"
      first-text="<<"
      prev-text="<"
      next-text=">"
      last-text=">>"
    />
  </div>
</template>

<script lang="ts">
import CardItem from "@/components/card/CardItem.vue";

export default {
  components: { CardItem },
};
</script>
<style scoped>
.table-color {
  background: #f8f8f8;
  padding: 10px;
  margin-bottom: 10px;
}
.flex-start-end {
  display: flex;
  justify-content: space-between;
}
.search-input {
  min-width: 340px;
  max-width: 400px;
}
</style>
