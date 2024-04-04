<template>
  <div class="navbar-color">
    <BNavbar class="container">
      <BNavbarBrand href="#">CARDS</BNavbarBrand>
      <BNavbarToggle target="nav-collapse" />
      <BCollapse id="nav-collapse" is-nav>
        <BNavbarNav>
          <BNavItem href="#">Link</BNavItem>
        </BNavbarNav>
        <BNavbarNav class="ms-auto mb-2 mb-lg-0">
          <BNavItemDropdown right>
            <template #button-content>
              <em>Пользователь</em>
            </template>
            <BDropdownItem href="#">Профиль</BDropdownItem>
            <BDropdownItem href="#">Выйти</BDropdownItem>
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
  background: dodgerblue;
}
</style>
<script setup lang="ts"></script>
