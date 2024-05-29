<template>
  <main>
   --
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
iframe {
  width: 100%;
  height: 100%;
  background-color: inherit;

  & body {
    background-color: inherit;
  }
}
</style>
