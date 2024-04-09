<template>
  <BTr>
    <!--    TODO Правильная ссылка-->
    <BTh><a href="/pack/1/">Pack's name</a></BTh>
    <BTd>Pack's author</BTd>
    <BTd>Pack's date</BTd>
    <BTd>Pack's cards count</BTd>
    <BTd>
      <BButton variant="success">Изучить</BButton>

      <!--        TODO Если админ / свой пак-->
      <div v-if="true">
        <BButton @click="editPackModal = true" variant="warning"
          >Изменить</BButton
        >
        <BModal centered v-model="editPackModal" title="Изменить набор">
          <BFormInput id="input-1" placeholder="Название" required />
        </BModal>

        <BButton @click="deletePackModal = true" variant="danger"
          >Удалить</BButton
        >
        <BModal centered v-model="deletePackModal" title="Удалить набор?"
          >Вы действительно хотите удалить набор НАЗВАНИЕ?</BModal
        >
      </div>
    </BTd>
  </BTr>
</template>

<script lang="ts">
export default {
  data() {
    return {
      editPackModal: false,
      deletePackModal: false,
    };
  },
};
</script>

<style scoped>
.pack-item {
  background: #f8f8f8;
  padding: 10px;
  margin-bottom: 10px;
}
</style>
