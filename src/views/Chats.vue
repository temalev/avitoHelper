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
      <Card
        v-for="item in accounts"
        :key="item.id"
        class="mt-4 w-full pointer"
        @click="selectedAccount = item.id"
      >
        <template #title>{{ item.name }}</template>
        <template #content>
          <div class="d-flex-column">
            <div>Непрочитанных сообщений: {{ item.count || 0 }}</div>
            <div>Email: {{ item.email }}</div>
            <div>Телефон: {{ item.phone }}</div>
            <a :href="item.profileUrl">Открыть на Авито</a>
          </div>
        </template>
        <template #footer></template>
      </Card>
    </div>
    <div v-loading="chatsLoading" class="chats">
      <Card
        v-for="item in list"
        :key="item.id"
        class="mt-4 w-full pointer"
        @click="$router.push({ name: 'chat', params: { chatId: item.id, accountId: selectedAccount } })"
      >
        <template #title>{{`${item.title}`}}{{!item.lastMessage.read ? ' | Непрочитанно' : ''}}</template>
        <template #content>
          <div class="d-flex-column mb-20px ml-20px">
            <div>
              {{ item?.ad?.title || '' }} {{ item?.ad?.price ? `| ${item.ad.price} ₽` : '' }}
            </div>
            <div>
              {{ item?.ad?.address }}
            </div>
          </div>
          <div>
            {{ item.lastMessage.text }}
          </div>
        </template>
        <template #footer></template>
      </Card>
    </div>
    <Paginator v-if="list.length" :rows="10" :totalRecords="total" @page="test" :rowsPerPageOptions="[10, 20, 30]" class="mt-2"></Paginator>
  </main>
</template>
<script>
import { useUserStore } from '@/stores/user'
import { getChats, getAccountChatCounts } from '@/api/chats'
import { offset } from '@popperjs/core'
export default {
  props: {
    chatId: [String],
    updateMessages: [String],
  },
  data() {
    return {
      list: '',
      store: useUserStore(),
      selectedAccount: null,
      accounts: [],
      total: null,
      chatsLoading: false,
    }
  },
  watch: {
    updateMessages(val) {
      this.getChats()
    },
    selectedAccount(val) {
      this.getChats()
    }
  },
  mounted() {
    this.getAccounts()
  },

  methods: {
    test(val) {
      this.getChats(val)
    },
    async getChats(pagination) {
      this.chatsLoading = true;
      const params = {
        accountId: this.selectedAccount,
        limit: pagination?.rows || 10,
        offset: pagination?.first || 0,
      }
      try {
        const res = await getChats(params)
        this.list = res.сonversations
        this.total = res.total
      } catch (e) {
        console.error(e)
      }
      this.chatsLoading = false;
    },
    async getAccounts() {
      try {
        const accounts = await getAccountChatCounts()
        this.accounts = accounts
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
  height: calc(100vh - 90px);
}
.chats {
  display: flex;
  flex-direction: column;
  overflow: auto;
  height: calc(100vh - 140px);
}

</style>
