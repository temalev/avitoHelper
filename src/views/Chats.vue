<template>
  <main>
    <Dropdown
      v-if="selectedAccount"
      v-model="selectedAccount"
      :options="accounts"
      optionLabel="name"
      optionValue="id"
      placeholder="Выберите аккаунт"
      class="w-full md:w-14rem"
    />
    <div v-if="!selectedAccount" class="d-flex-column">
      <h3>Выберите аккаунт</h3>
      <Card
        v-for="item in accounts"
        :key="item.id"
        class="mt-4 w-full pointer"
        @click="selectedAccount = item.id"
      >
        <template #title>{{ item.name }}</template>
        <template #content>
          <div class="d-flex-column">
            <div>{{ item.email }}</div>
            <a :href="item.profile_url">{{ item.profile_url }}</a>
          </div>
        </template>
        <template #footer> </template>
      </Card>
    </div>
    <div class="chats">
      <Card
        v-for="item in list"
        :key="item.id"
        class="mt-4 w-full pointer"
        @click="$router.push({ name: 'chat', params: { chatId: item.id, accountId: selectedAccount } })"
      >
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
import { getChats } from '@/api/chats'
import { getAccounts } from '@/api/avitoAccount'
export default {
  props: {
    chatId: [String]
  },
  data() {
    return {
      list: '',
      store: useUserStore(),
      selectedAccount: null,
      accounts: []
    }
  },
  watch: {
    selectedAccount(val) {
      this.getChats()
    }
  },
  mounted() {
    this.getAccounts()
  },

  methods: {
    async getChats() {
      const params = {
        accountId: this.selectedAccount
      }
      try {
        const res = await getChats(params)
        this.list = res
      } catch (e) {
        console.error(e)
      }
    },
    async getAccounts() {
      try {
        const res = await getAccounts()
        this.accounts = res.accounts
      } catch (e) {
        console.error(e)
      }
    },
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
