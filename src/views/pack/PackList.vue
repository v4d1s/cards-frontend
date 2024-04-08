<template>
  <div class="container">
    <BRow>
      <BCol>
        <h4>Набор карточек</h4>
      </BCol>
      <BCol offset="7">
        <BButton @click="newPackModal = true" variant="outline-primary"
          >Создать набор</BButton
        >
        <BModal centered v-model="newPackModal" title="Новый набор">
          <BFormInput id="input-1" placeholder="Название" required />
        </BModal>
      </BCol>
    </BRow>
    <hr />
    <BRow>
      <BCol sm="4">
        <BFormInput placeholder="Название набора" />
      </BCol>
      <BCol sm="2">
        <BDropdown variant="outline-secondary" text="Дата">
          <BDropdownItem href="#">По возрастанию</BDropdownItem>
          <BDropdownItem href="#">По убыванию</BDropdownItem>
        </BDropdown>
      </BCol>
      <BCol sm="2">
        <BDropdown variant="outline-secondary" text="Количество карточек">
          <BDropdownItem href="#">По возрастанию</BDropdownItem>
          <BDropdownItem href="#">По убыванию</BDropdownItem>
        </BDropdown>
      </BCol>
      <BCol offset="2">
        <!--        TODO Для пользователей. Для админа-->
        <div v-if="true">
          <BButtonGroup>
            <BButton variant="outline-secondary">Свои</BButton>
            <BButton variant="outline-secondary">Общие</BButton>
          </BButtonGroup>
        </div>
        <div v-else>
          <BButtonGroup>
            <BButton variant="outline-secondary">Все</BButton>
            <BButton variant="outline-secondary">Общие</BButton>
          </BButtonGroup>
        </div>
      </BCol>
    </BRow>
    <hr />

    <!--    TODO Pack's list-->
    <BTableSimple hover responsive class="table-color">
      <BThead>
        <BTr>
          <BTh sticky-column>Название</BTh>
          <BTh>Автор</BTh>
          <BTh>Дата создания</BTh>
          <BTh>Количество карточек</BTh>
          <BTh>Действия</BTh>
        </BTr>
      </BThead>
      <BTbody>
        <pack-item />
        <pack-item />
        <pack-item />
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
import PackItem from "@/components/pack/PackItem.vue";

export default {
  components: { PackItem },
  data() {
    return {
      newPackModal: false,
    };
  },
};
</script>

<style scoped>
.table-color {
  background: #f8f8f8;
  padding: 10px;
  margin-bottom: 10px;
}
</style>
