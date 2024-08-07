<template>
  <div class="chat">
    <Button type="button" class="w-50" label="Назад" severity="secondary" @click="$router.push('../list')"></Button>
    <div v-loading="loadingMessages" class="chat-messages">
      <template v-if="messages.length">
      <div
        v-for="message in messages"
        :key="message.id"
        class="message-container"
        :style="{ 
        justifyContent: message.isMyMessage ? 'flex-end' : 'flex-start',
        }"
      >
        <div class="message" :style="{
          backgroundColor: message.isMyMessage ? '#506bb68a' : '',
        }">
        <p>{{ message.text }}</p>
          <p class="capture text-secondary" style="text-align: right">{{ formatDate(message.createdAt) }}</p>
        </div>
      </div>
    </template>

    </div>
    <form class="chat-bottom" @submit="sendMessage">
      <InputText id="email" v-model="inputMessage" class="flex-auto" autocomplete="off" />
      <Button type="button" label="Отправить" severity="secondary" @click="sendMessage"></Button>
    </form>
  </div>
</template>
<script>
import { getChatMessages, sendMessage, readMessages } from '@/api/chats'

export default {
  props: {
    chatId: [String],
    accountId: [String],
    updateMessages: [String],
  },
  inject: ['websocketState'],
  data() {
    return {
      messages: '',
      inputMessage: null,
      loadingMessages: false
    }
  },
  watch: {
    updateMessages(val) {
      this.getChatMessages()
    },
  },
  mounted() {
    this.getChatMessages()
    this.readMessages()
  },
  methods: {
    formatDate(date) {
    // Проверка, является ли date объектом Date
    date = new Date(date)

    const currentDay = new Date()

      // Получение текущей даты без времени
      const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Получение даты без времени для сравнения
    const inputDate = new Date(date);
    inputDate.setHours(0, 0, 0, 0);

    // Получение компонентов времени
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const time = `${hours}:${minutes}`;

    // Проверка, является ли переданная дата сегодняшним днем
    if (inputDate.getTime() === today.getTime()) {
        return time; // Возвращаем только время
    }

    // Получение компонентов даты
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // месяцы начинаются с 0
    const year = date.getFullYear();

    // Формирование строки в нужном формате
    return `${day}.${month}.${year} ${time}`;
},
    async getChatMessages() {
      this.loadingMessages = true
      try {
        const res = await getChatMessages(this.chatId)
        this.messages = res.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))

        setTimeout(() => {
          const myDiv = document.getElementsByClassName('chat-messages')[0]
          myDiv.scrollTop = myDiv.scrollHeight - myDiv.clientHeight;
        }, 100);

      } catch (e) {
        console.error(e)
      }
      this.loadingMessages = false
    },
    async sendMessage(event) {
      event.preventDefault()
      const data = {
        text: this.inputMessage
      }
      try {
        const res = await sendMessage(this.chatId, data)
        this.inputMessage = null
        setTimeout(() => {
          this.getChatMessages()
        }, 500)
      } catch (e) {
        console.error(e)
      }
    },
    async readMessages() {
      await readMessages(this.chatId)
    }
  }
}
</script>
<style lang="scss" scoped>
.chat {
  background-color: inherit;
  border-radius: 12px;
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  gap: 12px;

  &-messages {
    background-color: var(--background-color);
    height: calc(100% - 50px);
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: auto;
  }

  & .message-container {
    display: flex;
    width: 100%;
  }

  & .message {
    width: fit-content;
    border: 1px solid #506bb623;
    background-color: #ffffffe8;
    border-radius: 12px;
    padding: 12px;
  }

  &-bottom {
    height: 50px;
    width: 100%;
    background-color: var(--background-color);
    display: flex;
    padding: 8px;
    gap: 12px;
    border-radius: 12px;
  }
}
</style>
