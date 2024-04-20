<template>
  <BTr>
    <BTh
      ><a :href="'/pack/' + pack.id">{{ pack.name }}</a></BTh
    >
    <BTd>{{ pack.user.name }}</BTd>
    <BTd>{{ pack.createdAt.split("T")[0] }}</BTd>
    <BTd>{{ pack.cardsCount }}</BTd>
    <BTd>
      <BButton
        :href="'/pack/' + pack.id + '/learning'"
        variant="success"
        v-if="currentUserId > 0"
        class="margin-button"
        >Изучить</BButton
      >
      <BButton
        :href="'/login'"
        variant="success"
        v-if="currentUserId == 0"
        class="margin-button"
        >Войдите, чтобы изучить</BButton
      >
      <div v-if="isAdmin || currentUserId == pack.userId">
        <BButton
          class="margin-button"
          @click="modalEdit = !modalEdit"
          variant="warning"
          >Изменить</BButton
        >
        <BModal
          centered
          v-model="modalEdit"
          title="Изменить набор"
          hide-header-close
          hideFooter
          @hide.prevent
        >
          <BForm @submit="editPack">
            <BFormInput
              v-model="newName"
              type="text"
              class="col-margin"
              placeholder="Название"
              required
            />
            <BFormCheckbox
              switch
              v-model="newPrivate"
              variant="outline-primary"
              @click="newPrivate = !newPrivate"
            >
              Изменить видимость</BFormCheckbox
            >
            <div class="flex-start-end">
              <div>
                <BButton type="submit" variant="outline-primary"
                  >Изменить</BButton
                >
              </div>
              <div>
                <BButton @click="closeModalEdit" variant="outline-danger"
                  >Отменить</BButton
                >
              </div>
            </div>
          </BForm>
        </BModal>

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
          title="Удалить набор?"
        >
          <p>
            Вы действительно хотите удалить набор
            <strong>{{ pack.name }}</strong>
            ?
          </p>
          <div class="flex-start-end">
            <div>
              <BButton @click="deletePack" variant="outline-danger"
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
    pack: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      modalEdit: false,
      modalDelete: false,

      newName: this.pack.name,
      newPrivate: false,

      cookies: useCookies(),
      currentUserId: 0,
      isAdmin: false,
    };
  },
  methods: {
    async editPack() {
      let newPrivate = false;
      if (this.newPrivate) {
        newPrivate = !this.pack.isPrivate;
      }
      await axios({
        url: "http://localhost:3000/pack/" + this.pack.id,
        method: "patch",
        data: {
          name: this.newName,
          isPrivate: newPrivate,
        },
        headers: {
          Authorization: "Bearer " + this.cookies.cookies.get("access_token"),
        },
      });

      await router.go(0);
    },
    async deletePack() {
      await axios({
        url: "http://localhost:3000/pack/" + this.pack.id,
        method: "delete",
        headers: {
          Authorization: "Bearer " + this.cookies.cookies.get("access_token"),
        },
      });
      await router.go(0);
    },
    closeModalEdit() {
      this.modalEdit = false;
      this.newPrivate = false;
      this.newName = this.pack.name;
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
.flex-start-end {
  display: flex;
  justify-content: space-between;
}
.col-margin {
  margin-bottom: 10px;
}
.pack-item {
  background: #f8f8f8;
  padding: 10px;
  margin-bottom: 10px;
}
.margin-button {
  margin: 3px;
}
</style>
