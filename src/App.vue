<template>
  <div class="navbar-color">
    <BNavbar class="container">
      <BNavbarBrand href="/packs_list"
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
              <div v-if="false">
                <em>SOME NAME</em>
              </div>
              <div v-else>
                <em>Пользователь</em>
              </div>
            </template>
            <div v-if="false">
              <BDropdownItem href="/change_name">Изменить имя</BDropdownItem>
              <BDropdownItem href="/logout">Выйти</BDropdownItem>
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
