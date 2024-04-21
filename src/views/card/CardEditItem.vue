<template>
  <div class="container">
    <card-input :oldCardId="parseInt($route.params.cardId[0])" />
  </div>
</template>

<script lang="ts">
import CardInput from "@/components/card/CardInput.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { CardInput },
});
</script>

<style scoped></style>
