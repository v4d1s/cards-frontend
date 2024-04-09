<template>
  <div class="container">
    <BRow>
      <BCol>
        <!--        TODO Название пака-->
        <h4>НАЗВАНИЕ ПАКА</h4>
      </BCol>
      <BCol offset="7">
        <BButton variant="outline-primary">Создать карточку</BButton>
      </BCol>
    </BRow>
    <hr />
    <BRow>
      <BCol sm="4">
        <BFormInput placeholder="Вопрос карточки" />
      </BCol>
      <BCol sm="2">
        <BDropdown variant="outline-secondary" text="Дата">
          <BDropdownItem href="#">По возрастанию</BDropdownItem>
          <BDropdownItem href="#">По убыванию</BDropdownItem>
        </BDropdown>
      </BCol>
      <BCol sm="1">
        <BDropdown variant="outline-secondary" text="Оценка">
          <BDropdownItem href="#">По возрастанию</BDropdownItem>
          <BDropdownItem href="#">По убыванию</BDropdownItem>
        </BDropdown>
      </BCol>
    </BRow>
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
</style>
