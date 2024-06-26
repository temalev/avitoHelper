<script>
import { reactive, provide } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { getMe } from '@/api/login'
import { useUserStore } from '@/stores/user'
import TheHeader from '@/components/TheHeader.vue'
import TheSideBar from '@/components/TheSideBar.vue'

const websocketState = reactive({
  message: null,
  payload: null
})

provide('websocketState', websocketState)

export default {
  components: {
    TheHeader,
    TheSideBar
  },
  data() {
    return {
      store: useUserStore(),
      connection: null,
      updateMessages: null
    }
  },
  created() {
    this.getMe()
    this.connection = new WebSocket('wss://p.avigroup.site/ws')
    this.connection.onmessage = (e) => {
      const resOnMessage = JSON.parse(e.data)
      switch (resOnMessage.event) {
        case 'NEW_MESSAGE':
          {
            console.log(resOnMessage.payload.isMyMessage)
            if (!resOnMessage.payload.isMyMessage) {
              this.show(resOnMessage.payload.messageText)
              this.updateMessages = resOnMessage.payload.messageText
            }
            websocketState.message = 'NEW_MESSAGE'
            websocketState.payload = resOnMessage.payload
          }
          break
        case 'PARSING_IS_OVER':
          break
        case 'PARSING_FAILED':
          break

        default:
          break
      }
    }
    this.connection.onopen = (e) => {
      console.log(e)
      console.log('Successfully connected to the echo websocket server...')
      this.sendMessage()
    }
  },
  mounted() {
    setInterval(() => {
      this.getMe()
    }, 15000)
  },

  methods: {
    async getMe() {
      try {
        const res = await getMe()
        this.store.user = res
      } catch (e) {
        console.error(e)
      }
    },
    sendMessage() {
      this.connection.send(JSON.stringify({ type: 'subscribe', userUuid: this.store.user.uuid }))
    },
    show(text) {
      this.$toast.add({
        severity: 'contrast',
        summary: 'Получено новое сообщение',
        detail: text,
        life: 3000
      })
    }
  }
}
</script>

<template>
  <TheSideBar />
  <Toast position="bottom-left" />
  <div class="page d-flex-column w-full">
    <TheHeader />
    <RouterView :updateMessages="updateMessages" />
  </div>
</template>

<style scoped scss>
.page {
  background-color: transparent;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  /* width: 100%; */
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
