<script setup></script>

<template>
  <div class="page">
    <main>
      <div class="body">
        <Card
          style="width: 25rem; overflow: hidden; height: 300px"
          @click="$router.push({ name: 'chatGpt' })"
          class="pointer"
        >
          <template #header>
            <!-- <img alt="user header" src="/images/usercard.png" /> -->
          </template>
          <template #title>Чат-GPT</template>
          <template #subtitle>Интеллектуальный помошник</template>
          <template #content>
            <p class="m-0">
              Задайте любой вопрос, и наш умный ассистент предоставит вам мгновенный и точный ответ.
            </p>
          </template>
          <template #footer>
            <div class="mt-14">10 руб - 1 сообщение</div>
          </template>
        </Card>
        <Card
          style="width: 25rem; overflow: hidden; height: 300px"
          @click="$router.push({ name: 'randomizerText' })"
          class="pointer"
        >
          <template #header>
            <!-- <img alt="user header" src="/images/usercard.png" /> -->
          </template>
          <template #title>Уникализатор текста и изображений</template>
          <template #subtitle>Тысячи вариаций уникального контента</template>
          <template #content>
            <p class="m-0">
              Сохраняйте уникальность своего контента, генерируя неограниченное количество
              оригинальных текстов и изображений.
            </p>
          </template>
          <template #footer>
            <div class="mt-2">0.2 руб за 1 вариант</div>
          </template>
        </Card>
        <Card
          style="width: 25rem; overflow: hidden; height: 300px"
          @click="$router.push({ name: 'AutoLoader' })"
          class="pointer"
        >
          <template #header>
            <!-- <img alt="user header" src="/images/usercard.png" /> -->
          </template>
          <template #title>Автоматическое создание таблицы для автозагрузки на Avito</template>
          <template #subtitle>Больше никакой рутины</template>
          <template #content>
            <p class="m-0">
              Упростите процесс публикации объявлений с помощью нашей автоматической системы
              создания таблиц.
            </p>
          </template>
          <template #footer>
            <div class="mt-2">до 500 объяв - 800 руб, до 5000 - 1150, больше - 1500</div>
          </template>
        </Card>
        <Card
          style="width: 25rem; overflow: hidden; height: 300px"
          @click="$router.push({ name: 'Parser' })"
          class="pointer"
        >
          <template #header>
            <!-- <img alt="user header" src="/images/usercard.png" /> -->
          </template>
          <template #title>Парсер объявлений с Avito</template>
          <template #subtitle>Сократит время анализа в несколько раз</template>
          <template #content>
            <p class="m-0">
              Собирайте ценные данные о рынке, анализируя ключевые показатели эффективности и
              тренды.
            </p>
          </template>
          <template #footer>
            <div class="mt-14">50 руб - 1 страница</div>
          </template>
        </Card>
      </div>
    </main>
  </div>
</template>
<style lang="scss" scoped>
.page {
  display: flex;
  gap: 12px;
  padding: 0 20px;
}
main {
  display: flex;
  flex-direction: column;
  background-color: inherit;
}
.body {
  margin: 20px;
  display: flex;
  gap: 18px;
  flex-wrap: wrap;
  align-content: flex-start;
}
</style>
