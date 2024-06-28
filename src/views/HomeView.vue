<template>
  <div class="page">
    <main>
      <div class="body">
        <div class="d-flex w-100% gap-4">
          <Card style="overflow: hidden" class="w-50%">
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

          <Card style="overflow: hidden" class="w-50% h-100%">
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
        <Card style="overflow: hidden">
          <template #title>Новости</template>
          <template #content>
            <div v-if="newsList.length" class="d-flex-column gap-4 mb-2">
              <Card v-for="news in newsList" :key="news.id" style="overflow: hidden">
                <template #title> {{ news.title }}</template>
                <template #content> <div v-html="news.content"></div></template>
                <template #footer>
                  <div class="mt-14">{{ formatDate(news.createdAt) }}</div>
                </template>
              </Card>
            </div>
            <div class="text-secondary"> Пока нет новостей </div>
          </template>
        </Card>
      </div>
    </main>
  </div>
</template>
<script>
import { getNews } from '@/api/news'
export default {
  data() {
    return {
      newsList: []
    }
  },
  mounted() {
    this.getNews()
  },
  methods: {
    async getNews() {
      try {
        const res = await getNews()
        this.newsList = res
      } catch (e) {
        console.error(e)
      }
    },
    formatDate(date) {
      // Проверка, является ли date объектом Date
      date = new Date(date)

      const currentDay = new Date()

      // Получение текущей даты без времени
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      // Получение даты без времени для сравнения
      const inputDate = new Date(date)
      inputDate.setHours(0, 0, 0, 0)

      // Получение компонентов времени
      const hours = String(date.getHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')
      const time = `${hours}:${minutes}`

      // Проверка, является ли переданная дата сегодняшним днем
      if (inputDate.getTime() === today.getTime()) {
        return time // Возвращаем только время
      }

      // Получение компонентов даты
      const day = String(date.getDate()).padStart(2, '0')
      const month = String(date.getMonth() + 1).padStart(2, '0') // месяцы начинаются с 0
      const year = date.getFullYear()

      // Формирование строки в нужном формате
      return `${day}.${month}.${year} ${time}`
    }
  }
}
</script>
<style lang="scss" scoped>
.page {
  display: flex;
  gap: 12px;
  padding: 0 20px;
  overflow: auto;
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
