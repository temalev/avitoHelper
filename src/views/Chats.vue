
<template>
    <main>
      <Dropdown v-model="selectedAccount" :options="accounts" optionLabel="name" optionValue="id" placeholder="Выберите аккаунт" class="w-full md:w-14rem" />
      <div class="chats">
      <Card v-for="item in list" :key="item.id" class="mt-4 w-full pointer" @click="$router.push({name: 'chat', params: {chatId: item.id}})">
        <template #title>{{ item.title }}</template>
        <template #content> 
          <div class="d-flex-column">
            <div>{{ item.avitoAccount.email }}</div>
          <a :href="item.profile_url">{{ item.profile_url }}</a>
        </div>
          </template>
        <template #footer> {{ item.lastMessage.text }} </template>
      </Card>
    </div>
    </main>
</template>
<script>
import { useUserStore } from '@/stores/user'
import { getChats } from '@/api/chats';
import {getAccounts} from '@/api/avitoAccount'
export default {
  props: {
    chatId: [String]
  },
  data() {
    return {
      list: '',
      connection: null,
      store: useUserStore(),
      selectedAccount: 1,
      accounts: [
        {
          id: 1,
          name: 'Паша'
        }
      ]
    }
  },
  watch: {
    selectedAccount(val) {
      this.getChats()
    }
  },
  mounted(){
    this.getChats()
    this.getAccounts()
  },
  created() {
    this.connection = new WebSocket("wss://api.avigroup.site/ws")
    this.connection.onmessage = (e) => {
     const resOnMessage = JSON.parse(e.data)
     switch (resOnMessage) {
      case 'NEW_MESSAGE':
        
        break;
      case 'PARSING_IS_OVER':
      
      break;
      case 'PARSING_FAILED':
      
      break;

      default:
        break;
     }
    }
    this.connection.onopen = (e) => {
      console.log(e);
      console.log('Successfully connected to the echo websocket server...');
      this.sendMessage()
    }
  },

  methods: {
    async getChats(){
      const params = {
        accountId: this.selectedAccount
      }
      try {
        const res = await getChats(params)
        this.list = res
      }
      catch(e) {
        console.error(e);
      }
    },
    async getAccounts(){
      try {
        const res = await getAccounts()
        this.accounts = res.accounts
      }
      catch(e) {
        console.error(e);
      }
    },

    sendMessage() {
      this.connection.send(JSON.stringify({"type":"subscribe","userUuid": this.store.user.uuid}))
    }
  }
}
</script>
<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;
  background-color: inherit;
  width: 100%;
  min-height: 100vh;
  height: 100%;
}
.chats {
  display: flex;
  flex-direction: column;
  overflow: auto;
}
iframe {
  width: 100%;
  height: 100%;
  background-color: inherit;

  & body {
    background-color: inherit;
  }
}
</style>
