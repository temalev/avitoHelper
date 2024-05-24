<template>
  <div class="chat">
    <div class="chat-messages">
      <div v-for="message in messages" :key="message.id" class="message-container" :style="{justifyContent: message.isMyMessage ? 'flex-end' : 'flex-start'}">
        <div class="message">
          {{ message.text }}
        </div>

      </div>
    </div>
    <div class="chat-bottom">
      <InputText id="email" v-model="inputMessage" class="flex-auto" autocomplete="off" />
      <Button
          type="button"
          label="Отправить"
          severity="secondary"
          @click="sendMessage"
        ></Button>
    </div>
  </div>
</template>
<script>
import { getChatMessages, sendMessage } from '@/api/chats'

export default {
  props: {
    chatId: [String]
  },
  data() {
    return {
      messages: '',
      inputMessage: null,
    }
  },
  mounted() {
    this.getChatMessages()
  },
  methods: {
    async getChatMessages() {
      try {
        const res = await getChatMessages(this.chatId)
        this.messages = res
      } catch (e) {
        console.error(e)
      }
    },
    async sendMessage() {
      const data = {
        text: this.inputMessage
      }
      try {
        const res = await sendMessage(this.chatId, data)
        this.inputMessage = null
        setTimeout(() => {
        this.getChatMessages();
        }, 500);
      }
      catch(e) {
        console.error(e);
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.chat {
  background-color: #fff;
  border-radius: 12px;
  height: 100%;

  &-messages {
    background-color: #eef5fb;
    height: calc(100% - 50px);
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  & .message-container {
    display: flex;
    width: 100%;
  }

  & .message {
    width: fit-content;
    border: 1px solid #506bb623;
    background-color:#506bb623 !important;
    border-radius: 12px;
    padding: 12px;
  }

  &-bottom {
    height: 50px;
    width: 100%;
    background-color: #cbd2d8;
    display: flex;
    padding: 8px;
    gap: 12px;
    border-radius: 12px 12px 0 0;
  }
}
</style>
