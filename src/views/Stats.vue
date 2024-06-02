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

    <div v-if="contactsFavoritesViews" class="satistics">
      <Panel header="Контакты" style="width: 200px">
        <p class="m-0">
          <span class="font-bold">{{ contactsFavoritesViews.contacts.current }}</span>
          <span :style="{ color: contactsFavoritesViews.contacts.prev > 0 ? 'green' : 'red' }">
            <span class="ml-2" style="margin-right: -4px">{{ contactsFavoritesViews.contacts.prev > 0 ? '+' : '-' }}</span>
            {{ contactsFavoritesViews.contacts.prev }}%</span
          >
        </p>
      </Panel>
      <Panel header="Избранное" style="width: 200px">
        <p class="m-0">
          <span class="font-bold">{{ contactsFavoritesViews.favorites.current }}</span>
          <span :style="{ color: contactsFavoritesViews.favorites.prev > 0 ? 'green' : 'red' }">
            <span class="ml-2" style="margin-right: -4px">{{ contactsFavoritesViews.favorites.prev > 0 ? '+' : '-' }}</span>
            {{ contactsFavoritesViews.favorites.prev }}%</span
          >
        </p>
      </Panel>
      <Panel header="Просмотры" style="width: 200px">
        <p class="m-0">
          <span class="font-bold">{{ contactsFavoritesViews.views.current }}</span>
          <span :style="{ color: contactsFavoritesViews.views.prev > 0 ? 'green' : 'red' }">
            <span class="ml-2" style="margin-right: -4px">{{ contactsFavoritesViews.views.prev > 0 ? '+' : '-' }}</span>
            {{ contactsFavoritesViews.views.prev }}%</span
          >
        </p>
      </Panel>
    </div>
  </main>
</template>
<script>
import { getContactsFavoritesViews, getBalanceStat } from '@/api/avitoStatistics'
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
    getStats() {
      this.getContactsFavouritesViews();
      this.getBalanceStat()
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
        this.balanseStats = res
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
