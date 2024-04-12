<template>
  <div class="login-field">
    <BForm @submit="loginUser">
      <BFormGroup
        id="input-group-1"
        label="Электронная почта:"
        label-for="input-1"
      >
        <BFormInput
          id="input-1"
          v-model="userData.email"
          type="email"
          placeholder="Введите почту"
          required
        />
      </BFormGroup>

      <BFormGroup id="input-group-2" label="Пароль:" label-for="input-2">
        <BFormInput
          type="password"
          v-model="userData.password"
          id="input-2"
          placeholder="Пароль"
          required
        />
      </BFormGroup>

      <BButton type="submit" variant="primary">Войти</BButton>
    </BForm>

    <hr />
    <p>Нет аккаунта? <a href="/register">Зарегистрируйтесь!</a></p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";

export default defineComponent({
  methods: {
    ...mapActions({
      loginUser: "authLogin/loginUser",
    }),
  },
  computed: {
    ...mapState({
      userData: (state: any) => state.authLogin.userData,
    }),
  },
});
</script>

<style scoped>
.login-field {
  background: #f8f8f8;
  max-width: 500px;
  padding: 25px;
}
</style>
