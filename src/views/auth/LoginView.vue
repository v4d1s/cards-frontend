<template>
  <div class="login-field">
    <BForm>
      <BFormGroup
        id="input-group-1"
        label="Электронная почта:"
        label-for="input-1"
      >
        <BFormInput
          id="input-1"
          type="email"
          placeholder="Введите почту"
          required
        />
      </BFormGroup>

      <BFormGroup id="input-group-2" label="Пароль:" label-for="input-2">
        <BFormInput
          type="password"
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
export default {};
</script>

<style scoped>
.login-field {
  background: #f8f8f8;
  margin-top: 20px;
  max-width: 500px;
  padding: 25px;
}
</style>
