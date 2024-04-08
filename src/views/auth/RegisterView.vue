<template>
  <div class="register-field">
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

      <BFormGroup
        id="input-group-2"
        label="Введите пароль:"
        label-for="input-2"
      >
        <BFormInput
          type="password"
          id="input-2"
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
          placeholder="Пароль"
          required
        />
      </BFormGroup>

      <BButton type="submit" variant="primary">Регистрация</BButton>
    </BForm>
  </div>
</template>

<script lang="ts">
export default {};
</script>

<style scoped>
.register-field {
  background: #f8f8f8;
  max-width: 500px;
  padding: 25px;
}
</style>
