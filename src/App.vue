<template>
  <div class="navbar-color">
    <BNavbar toggleable="lg" class="container">
      <BNavbarBrand href="/packs"
        ><BImg fluid class="logo" :src="require(`../public/logo.png`)"
      /></BNavbarBrand>
      <BNavbarToggle target="nav-collapse" />
      <BCollapse id="nav-collapse" is-nav>
        <BNavbarNav class="ms-auto mb-2 mb-lg-0">
          <BNavItem href="/about">О проекте</BNavItem>
          <BNavItemDropdown right>
            <template #button-content>
              <div v-if="name">
                <em>{{ name }}</em>
              </div>
              <div v-else>
                <em>Пользователь</em>
              </div>
            </template>
            <div v-if="name">
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

.logo {
  width: 300px;
}
</style>
<script setup lang="ts"></script>
