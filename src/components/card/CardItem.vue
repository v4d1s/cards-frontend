<template>
  <BTr>
    <BTh><vue-latex :expression="card.question" /></BTh>
    <BTd v-if="card.image == ''"><vue-latex :expression="card.answer" /></BTd>
    <BTd v-else>
      <BImg
        class="image"
        fluid
        :src="backend + card.image"
        @click="redirect(card.image)"
      />
    </BTd>
    <BTd>{{ card.updatedAt.split("T")[0] }}</BTd>
    <BTd>{{
      +(card.gradesList[0].grade / card.gradesList[0].shots).toFixed(2)
    }}</BTd>
    <BTd>
      <div v-if="isAdmin || currentUserId == card.userId">
        <BButton
          :href="'/pack/' + card.packId + '/card/' + card.id + '/edit'"
          variant="warning"
          >Изменить</BButton
        >

        <BButton
          @click="modalDelete = !modalDelete"
          variant="danger"
          class="margin-button"
          >Удалить</BButton
        >
        <BModal
          hide-header-close
          hideFooter
          centered
          v-model="modalDelete"
          @hide.prevent
          title="Удалить карточку?"
        >
          <p>Вы действительно хотите удалить эту карточку?</p>
          <div class="flex-start-end">
            <div>
              <BButton @click="deleteCard" variant="outline-danger"
                >Удалить</BButton
              >
            </div>
            <div>
              <BButton
                @click="modalDelete = !modalDelete"
                variant="outline-secondary"
                >Отменить</BButton
              >
            </div>
          </div>
        </BModal>
      </div>
    </BTd>
  </BTr>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useCookies } from "vue3-cookies";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import router from "@/router";

export default defineComponent({
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      modalDelete: false,

      cookies: useCookies(),

      currentUserId: -1,
      isAdmin: false,

      backend: process.env.VUE_APP_BACKEND,
    };
  },
  methods: {
    redirect(id: string) {
      window.location.href = process.env.VUE_APP_BACKEND + id;
    },
    async deleteCard() {
      await axios({
        url:
          process.env.VUE_APP_BACKEND +
          this.card.packId +
          "/card/" +
          this.card.id +
          "/?userId=" +
          this.card.userId,
        method: "delete",
        headers: {
          Authorization: "Bearer " + this.cookies.cookies.get("access_token"),
        },
      });
      await router.go(0);
    },
    setCurrentUserId() {
      if (this.cookies.cookies.get("access_token")) {
        const token = Object(
          jwtDecode(this.cookies.cookies.get("access_token"))
        );
        this.currentUserId = token.id;
        if (token.isAdmin) {
          this.isAdmin = true;
        }
      }
    },
  },
  mounted() {
    this.setCurrentUserId();
  },
});
</script>

<style scoped>
.image {
  max-height: 300px;
}
.flex-start-end {
  display: flex;
  justify-content: space-between;
}
</style>
