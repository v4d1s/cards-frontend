<template>
  <div class="container div-container">
    <p>
      На сайте реализована
      <a href="https://ru.wikipedia.org/wiki/Система_Лейтнера"
        >система Лейтнера</a
      >
      для запоминания информации, основанная на принципе интервальных
      повторений. Карточки с вопросами повторяются через всё увеличивающиеся
      интервалы времени.
    </p>
    <p>
      Когда пользователь отвечает на вопрос из карточки, он должен оценить свой
      ответ одним из пяти вариантов: «Не знаю», «Плохо», «Нормально», «Хорошо»,
      «Отлично». После этого алгоритм определяет, когда показать этот вопрос при
      следующем повторении.
    </p>
    <p>
      Время следующего повторения вычисляется по формуле интервального
      повторения <vue-latex expression="y=2x+1" />, где
      <vue-latex expression="x" /> — это дата последнего повторения.
    </p>
    <p>Изменение времени в зависимости от ответа:</p>
    <ul>
      <li>«Не знаю» — 1 минута;</li>
      <li>«Плохо» — 10 минут;</li>
      <li>«Нормально» — 2 часа;</li>
      <li>«Хорошо» — 10 часов;</li>
      <li>«Отлично» — 24 часа.</li>
    </ul>

    <p>
      Например, если пользователь сначала выберет ответ «Не знаю», то время
      следующего повторения увеличится на одну минуту. Если он выберет этот
      вариант ещё раз, то время увеличится на три минуты, и так далее.
    </p>
    <p>
      Чтобы начать изучение вопросов, необходимо зарегистрироваться на сайте.
      Тогда система будет вести индивидуальный подсчёт.
    </p>
    <p>
      Подготавливаться можно как по вопросам, одобренным администратором, так и
      по своим собственным. В открытом доступе уже есть несколько наборов,
      связанных с высшей математикой. Можно создать неограниченное количество
      наборов с карточками, а также самих карточек в одном наборе.
    </p>
    <p>
      На сайте используется <vue-latex expression="\LaTeX" />, что позволяет
      записать вопрос и ответ в виде математических формул. Кроме того, можно
      прикрепить фотографию к вопросу, если нет желания писать текст.
    </p>
  </div>
</template>

<style scoped>
.div-container {
  text-align: justify;
  background: #f8f8f8;
  padding: 25px;
}
</style>
<script setup lang="ts"></script>
