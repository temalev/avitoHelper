
<template>
    <main>
    <Button
      type="button"
      label="Добавить аккаунт"
      style="flex-shrink: 0; width: fit-content"
      @click="showAddAccountModal = true"
    />
    <div class="d-flex-column">
      <Card v-for="item in list" :key="item.id" class="mt-4 w-full">
        <template #title>{{ item.name }}</template>
        <template #content> 
          <div class="d-flex-column">
            <div>Email: {{ item.email }}</div>
            <div>{{ item.phone ? `Телефон: ${item.phone}` : '' }}</div>
            <a :href="item.profileUrl">Открыть на Авито</a>
          <a :href="item.profile_url">{{ item.profile_url }}</a>
        </div>
          </template>
        <template #footer> 
          <Button
      type="button"
      label="Удалить"
      style="flex-shrink: 0; width: fit-content"
      @click="deleteAccount(item.id)"
    /> </template>
      </Card>
    </div>
    <Dialog
      v-model:visible="showAddAccountModal"
      modal
      header="Добавить аккаунт"
      :style="{ width: '35rem' }"
    >
      <span class="p-text-secondary block mb-5">Данные для подключения аккаунта можно получить
        <a href="https://www.avito.ru/professionals/api" target="_blank">тут</a>
      </span>
      <div class="flex align-items-center gap-3 mb-3">
        <label for="clientId" class="font-semibold w-10rem">Client_id</label>
        <InputText id="email" v-model="form.clientId" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex align-items-center gap-3 mb-3">
        <label for="clientId" class="font-semibold w-10rem">Client_secret</label>
        <InputText id="clientSecret" v-model="form.clientSecret" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex justify-content-end mt-8">
        <Button
          type="button"
          :loading="addAccountProcess"
          class="w50"
          label="Привязать"
          @click="addAvitoAccount"
        ></Button>
      </div>
    </Dialog>
  </main>
</template>
<script>
import {addAvitoAccount, getAccounts, deleteAvitoAccount} from '@/api/avitoAccount'

export default {
  data() {
    return {
      showAddAccountModal: false,
      addAccountProcess: false,
      form: {
        clientId: '',
        clientSecret: ''
      },
      list: [],
      tabs: [
        {
          id: 1,
          label: 'Интеграции' 
        },
        {
          id: 2,
          label: 'Реферральная программа' 
        }
      ]
    }
  },

  mounted() {
    this.getAccounts()
  },
  methods: {
    async addAvitoAccount(){
      try {
        const res = await addAvitoAccount(this.form)
        this.showAddAccountModal = false
        this.getAccounts()
      }
      catch (e) {
        console.error(e);
      }
    },
    async getAccounts() {
      try {
        const res = await getAccounts()
        this.list = res.accounts
      }
      catch (e) {
        console.error(e);
      }
    },
    async deleteAccount(id) {
      try {
        const res = await deleteAvitoAccount(id)
        this.getAccounts()
      }
      catch (e) {
        console.error(e);
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
}

</style>
