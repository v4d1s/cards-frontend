<template>
  <div class="register-field">
    <BForm @submit="registerUser">
      <BFormGroup
        id="input-group-1"
        label="Электронная почта:"
        label-for="input-1"
      >
        <BFormInput
          id="input-1"
          type="email"
          v-model="userData.email"
          placeholder="Введите почту"
          required
        />
      </BFormGroup>

      <BFormGroup
        id="input-group-2"
        label="Введите пароль:"
        label-for="input-2"
      >
        <BFormInput
          type="password"
          id="input-2"
          v-model="userData.password"
          placeholder="Пароль"
          required
        />
      </BFormGroup>
      <BFormGroup
        id="input-group-2"
        label="Введите пароль еще раз:"
        label-for="input-2"
      >
        <BFormInput
          type="password"
          id="input-2"
          v-model="userData.password2"
          placeholder="Пароль"
          required
        />
      </BFormGroup>

      <BButton type="submit" variant="primary">Регистрация</BButton>
    </BForm>
    <BToast class="container" v-model="haveError">
      {{ error }}
    </BToast>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";

export default defineComponent({
  methods: {
    ...mapActions({
      registerUser: "authRegister/registerUser",
    }),
  },
  computed: {
    ...mapState({
      userData: (state: any) => state.authRegister.userData,
      haveError: (state: any) => state.authRegister.haveError,
      error: (state: any) => state.authRegister.error,
    }),
  },
});
</script>

<style scoped>
.register-field {
  background: #f8f8f8;
  max-width: 500px;
  padding: 25px;
}
</style>
