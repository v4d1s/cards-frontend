<template>
  <div class="container">
    <BContainer>
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
        <BCol class="col-margin" alignSelf="start">
          <BFormInput class="search-input" placeholder="Название набора" />
        </BCol>
        <BCol class="col-margin" alignSelf="end">
          <!--        TODO Для пользователей. Для админа-->
          <!--        TODO pressed buttons-->
          <div v-if="true">
            <BButtonGroup>
              <BButton :pressed="true" variant="outline-secondary"
                >Свои</BButton
              >
              <BButton variant="outline-secondary">Общие</BButton>
            </BButtonGroup>
          </div>
          <div v-else>
            <BButtonGroup>
              <BButton :pressed="true" variant="outline-secondary">Все</BButton>
              <BButton variant="outline-secondary">Общие</BButton>
            </BButtonGroup>
          </div>
        </BCol>
      </BRow>
      <BRow>
        <BCol class="col-margin">
          <BButtonGroup>
            <BButton disabled>Дата</BButton>
            <BButton :pressed="true" variant="outline-primary"
              >По возрастанию</BButton
            >
            <BButton variant="outline-primary">По убыванию</BButton>
          </BButtonGroup>
          <!--        <BDropdown variant="outline-secondary" text="Дата">-->
          <!--          <BDropdownItem href="#">По возрастанию</BDropdownItem>-->
          <!--          <BDropdownItem href="#">По убыванию</BDropdownItem>-->
          <!--        </BDropdown>-->
        </BCol>
        <BCol class="col-margin">
          <BButtonGroup>
            <BButton disabled>Количество карточек</BButton>
            <BButton :pressed="true" variant="outline-primary"
              >По возрастанию</BButton
            >
            <BButton variant="outline-primary">По убыванию</BButton>
          </BButtonGroup>
          <!--        <BDropdown variant="outline-secondary" text="Количество карточек">-->
          <!--          <BDropdownItem href="#">По возрастанию</BDropdownItem>-->
          <!--          <BDropdownItem href="#">По убыванию</BDropdownItem>-->
          <!--        </BDropdown>-->
        </BCol>
      </BRow>
      <hr />
    </BContainer>

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

    <!--    TODO Размещение кнопок-->
    <div
      class="display: flex; justify-content: space-between; outline: 2px dashed #ccc;"
    >
      <div>
        <BFormInput class="search-input" placeholder="Название набора" />
      </div>
      <div>
        <!--        TODO Для пользователей. Для админа-->
        <!--        TODO pressed buttons-->
        <div v-if="true">
          <BButtonGroup>
            <BButton :pressed="true" variant="outline-secondary">Свои</BButton>
            <BButton variant="outline-secondary">Общие</BButton>
          </BButtonGroup>
        </div>
        <div v-else>
          <BButtonGroup>
            <BButton :pressed="true" variant="outline-secondary">Все</BButton>
            <BButton variant="outline-secondary">Общие</BButton>
          </BButtonGroup>
        </div>
      </div>
    </div>
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
.search-input {
  min-width: 300px;
  max-width: 400px;
}
.col-margin {
  margin-bottom: 10px;
}
</style>
