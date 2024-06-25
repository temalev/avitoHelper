<script setup></script>

<template>
  <div class="page">
    <main>
      <div class="body">
        <div class="d-flex w-100% gap-4">
          <Card style="overflow: hidden" @click="$router.push({ name: 'chatGpt' })" class="w-50%">
            <template #title>Цены</template>
            <template #content>
              <div class="d-flex-column gap-4">
                <div class="d-flex-column">
                  <h4 class="gradient-text">Чат-GPT</h4>
                  <p>20р запрос;</p>
                </div>
                <div class="d-flex-column">
                  <h4 class="gradient-text">Генератор текста</h4>
                  <p>20 коп за 1 шт.;</p>
                </div>
                <div class="d-flex-column">
                  <h4 class="gradient-text">Создание таблицы</h4>
                  <p>
                    До 500 об-ий = 1,6р за шт. От 500 до 5000 = 0,23 коп за шт. От 5000 до 10000
                    об-ий = 0,15 коп за шт.;
                  </p>
                </div>
                <div class="d-flex-column">
                  <h4 class="gradient-text">Парсер 1 страница (50 об-ий)</h4>
                  <p>50 руб.;</p>
                </div>
                <div class="d-flex-column">
                  <h4 class="gradient-text">Центр сообщений</h4>
                  <p>1 аккаунт с автоответами и статистикой = 100р в мес.;</p>
                </div>
              </div>
            </template>
          </Card>

          <Card
            style="overflow: hidden"
            @click="$router.push({ name: 'chatGpt' })"
            class="w-50% h-100%"
          >
            <template #title>Видео - инструкции</template>
            <template #content>
              <div class="d-flex-column">
                <a href="https://www.youtube.com/watch?v=-ToWURTrQ_g" class="gradient-text"
                  >Chat GPT 4 Turbo</a
                >
                <a href="https://www.youtube.com/watch?v=-JYjLWwLkNw" class="gradient-text"
                  >Генератор текстов</a
                >
                <a href="https://www.youtube.com/watch?v=ufTQRgsd8_8&t=11s" class="gradient-text"
                  >Создание и загрузка таблиц</a
                >
                <a href="https://www.youtube.com/watch?v=A7Z1NL3QT4A&t=12s" class="gradient-text"
                  >Центр сообщений/Статистика/Автоответчик</a
                >
                <a href="https://www.youtube.com/watch?v=uP6yb0EYgC0" class="gradient-text"
                  >Дополнительные инструменты</a
                >
              </div>
            </template>
          </Card>
        </div>
        <!-- <Card
          style="overflow: hidden; height: 300px"
          @click="$router.push({ name: 'chatGpt' })"
          class="pointer"
        >
          <template #header>
          </template>
          <template #title>Чат-GPT</template>
          <template #subtitle>Интеллектуальный помошник</template>
          <template #content>
            <p class="m-0">
              Задайте любой вопрос, и наш умный ассистент предоставит вам мгновенный и точный ответ.
            </p>
          </template>
          <template #footer>
            <div class="mt-14">20 ₽ - 1 сообщение</div>
          </template>
        </Card> -->
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
  flex-direction: column;
  gap: 18px;
  flex-wrap: wrap;
  align-content: flex-start;
}

.gradient-text {
  font-family: 'Arial', sans-serif; /* Замените на нужный шрифт */
  font-size: 18px; /* Подберите нужный размер */
  font-weight: bold; /* Жирный шрифт */
  background: linear-gradient(30deg, #650df0, #f81bad); /* Градиент от розового к фиолетовому */
  -webkit-background-clip: text;
  color: transparent;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Тень текста */
}

</style>
