<template>
  <BTr>
    <BTh>Question </BTh>
    <BTd>Answer | Photo </BTd>
    <BTd>Card's date</BTd>
    <BTd>Some grade</BTd>
    <BTd>
      <!--        TODO Если админ / свой пак-->
      <div v-if="true">
        <BButton variant="warning">Изменить</BButton>

        <BButton @click="deleteCardModal = true" variant="danger"
          >Удалить</BButton
        >
        <BModal centered v-model="deleteCardModal" title="Удалить карточку?"
          >Вы действительно хотите удалить карточку НАЗВАНИЕ?</BModal
        >
      </div>
    </BTd>
  </BTr>
</template>

<script lang="ts">
export default {
  data() {
    return {
      deleteCardModal: false,
    };
  },
};
</script>

<style scoped></style>
