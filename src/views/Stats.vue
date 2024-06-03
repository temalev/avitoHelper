<template>
  <main>
    <div class="d-flex gap-4">
      <Dropdown
      v-model="selectedAccount"
      :options="accounts"
      optionLabel="name"
      optionValue="id"
      placeholder="Аккаунт"
      class="w-full md:w-14rem"
    />
    <Dropdown
      v-model="selectedGroup"
      :options="groups"
      optionLabel="name"
      optionValue="value"
      placeholder="Период"
      class="w-full md:w-14rem"
    />
    </div>

    <div class="satistics">
      <Panel v-if="contactsFavoritesViews" header="Контакты" style="width: 200px">
        <p class="m-0">
          <span class="font-bold">{{ contactsFavoritesViews.contacts.current }}</span>
          <span class="ml-2" :style="{ color: contactsFavoritesViews.contacts.prev > 0 ? 'green' : 'red' }">
            {{ getPercent(contactsFavoritesViews.contacts.current, contactsFavoritesViews.contacts.prev) }}%</span
          >
        </p>
      </Panel>
      <Panel v-if="contactsFavoritesViews" header="Избранное" style="width: 200px">
        <p class="m-0">
          <span class="font-bold">{{ contactsFavoritesViews.favorites.current }}</span>
          <span class="ml-2" :style="{ color: contactsFavoritesViews.favorites.prev > 0 ? 'green' : 'red' }">
            {{ getPercent(contactsFavoritesViews.favorites.current, contactsFavoritesViews.favorites.prev)  }}%</span
          >
        </p>
      </Panel>
      <Panel v-if="contactsFavoritesViews" header="Просмотры" style="width: 200px">
        <p class="m-0">
          <span class="font-bold">{{ contactsFavoritesViews.views.current }}</span>
          <span class="ml-2" :style="{ color: contactsFavoritesViews.views.prev > 0 ? 'green' : 'red' }">
            {{ getPercent(contactsFavoritesViews.views.current, contactsFavoritesViews.views.prev) }}%</span
          >
        </p>
      </Panel>
      <Panel v-if="callsStats" header="Звонки" style="width: 200px">
        <p class="m-0">
          <span class="font-bold">{{ callsStats.current }}</span>
          <span class="ml-2" :style="{ color: callsStats.prev > 0 ? 'green' : 'red' }">
            {{ getPercent(callsStats.current, callsStats.prev) }}%</span
          >
        </p>
      </Panel>
      <Panel v-if="messagesStats" header="Сообщения" style="width: 200px">
        <p class="m-0">
          <span class="font-bold">{{ messagesStats.current }}</span>
          <span class="ml-2" :style="{ color: messagesStats.prev > 0 ? 'green' : 'red' }">
            {{ getPercent(messagesStats.current, messagesStats.prev) }}%</span
          >
        </p>
      </Panel>
    </div>
  </main>
</template>
<script>
import { getContactsFavoritesViews, getBalanceStat, getСallStat, getMessagesStat } from '@/api/avitoStatistics'
import { getAccounts } from '@/api/avitoAccount'
export default {
  data() {
    return {
      groups: [
        {
          name: 'День',
          value: 'day'
        },
        {
          name: 'Неделя',
          value: 'week'
        },
        {
          name: 'Месяц',
          value: 'month'
        }
      ],
      selectedGroup: 'day',
      accounts: [],
      selectedAccount: null,
      contactsFavoritesViews: null,
      balanseStats: null,
      callsStats: null,
      messagesStats: null,
    }
  },
  mounted() {
    this.getAccounts()
  },
  watch: {
    selectedAccount(val) {
      this.getStats()
    },
    selectedGroup(val) {
      this.getStats()
    }
  },
  methods: {
    getPercent(current, prev) {
      if (current === 0) return 0
      
      return Math.round((current - prev) / current)
    },
    getStats() {
      this.getContactsFavouritesViews();
      this.getBalanceStat()
      this.getСallStat()
      this.getMessagesStat()
    },
    async getContactsFavouritesViews() {
      const params = {
        group: this.selectedGroup
      }
      try {
        const res = await getContactsFavoritesViews(this.selectedAccount, params)
        this.contactsFavoritesViews = res
      } catch (e) {
        console.error(e)
      }
    },
    async getBalanceStat(){
      const params = {
        group: this.selectedGroup
      }
      try {
        // const res = await getBalanceStat(this.selectedAccount, params)
        // this.balanseStats = res
      } catch (e) {
        console.error(e)
      }
    },
    async getСallStat(){
      const params = {
        group: this.selectedGroup
      }
      try {
        const res = await getСallStat(this.selectedAccount, params)
        this.callsStats = res
      } catch (e) {
        console.error(e)
      }
    },
    async getMessagesStat() {
      const params = {
        group: this.selectedGroup
      }
      try {
        const res = await getMessagesStat(this.selectedAccount, params)
        this.messagesStats = res
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
  overflow: auto;
}

.satistics {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}
</style>
