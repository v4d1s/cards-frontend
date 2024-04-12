<template>
  <div class="navbar-color">
    <BNavbar class="container">
      <BNavbarBrand href="/packs"
        ><h2 class="logo-text">CARDS</h2></BNavbarBrand
      >
      <BNavbarToggle target="nav-collapse" />
      <BCollapse id="nav-collapse" is-nav>
        <BNavbarNav class="ms-auto mb-2 mb-lg-0">
          <BNavItemDropdown right>
            <!-- TODO проверка на наличие ползователя в куках. Если есть, то
            выводить имя пользователя -> изменить имя или выйти. Если нет, то
            пользователь -> войти или регистрация -->
            <template #button-content>
              <div v-if="name">
                <em>{{ name }}</em>
              </div>
              <div v-else>
                <em>Пользователь</em>
              </div>
            </template>
            <div v-if="name">
              <BDropdownItem href="/change_name">Изменить имя</BDropdownItem>
              <BDropdownItem @click="logOutUser">Выйти</BDropdownItem>
            </div>
            <div v-else>
              <BDropdownItem href="/login">Войти</BDropdownItem>
              <BDropdownItem href="/register">Регистрация</BDropdownItem>
            </div>
          </BNavItemDropdown>
        </BNavbarNav>
      </BCollapse>
    </BNavbar>
  </div>
  <router-view class="container"></router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";

export default defineComponent({
  methods: {
    ...mapActions({
      logOutUser: "authLogOut/logoutUser",
      getName: "authLogOut/getName",
    }),
  },
  computed: {
    ...mapState({
      name: (state: any) => state.authLogOut.name,
    }),
  },
  mounted() {
    this.name = this.getName();
  },
});
</script>

<style>
#app {
  font-family: sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.navbar-color {
  background: #0080ff;
  margin-bottom: 20px;
}

.logo-text {
  margin-top: 5px;
}
</style>
<script setup lang="ts"></script>
