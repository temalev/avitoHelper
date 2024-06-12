<template>
  <main>
    <DataTable :value="history" tableStyle="min-width: 50rem" class="mt-4">
      <Column field="description" header="Действие"></Column>
      <Column field="createdAt" header="Время взаимодействия">
        <template #body="slotProps">
          {{  formatDate(slotProps.data.createdAt) }}
        </template></Column
      >
      <Column field="amount" header="Сумма, ₽"></Column>
    </DataTable>
  </main>
</template>
<script>
import { formatDate } from '@/filters/index';
import { getHistory } from '@/api/history'
export default {
  data() {
    return {
      history: ''
    }
  },
  mounted() {
    this.getHistory()
  },
  methods: {
    formatDate,
    async getHistory() {
      try {
        const res = await getHistory()
        this.history = res
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
  height: 100%;
  overflow: auto;
}
</style>
