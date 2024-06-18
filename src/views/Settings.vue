<template>
  <main>
    <TheTabs :data="items" @activeTab="val => activeTab = val" />
    <div v-if="activeTab === 1" class="container">
      <div class="d-flex-column">
        <span class="mb-4" style="color: #fff">ID: {{ store.user?.id }}</span>
        <div class="d-flex-column gap-4">
          <div v-if="this.form" class="d-flex-column gap-1">
            <label for="name" style="color: #fff">Имя</label>
            <InputText
              id="name"
              v-model="form.name"
              class="flex-auto"
              style="width: 300px"
              autocomplete="off"
            />
          </div>
          <div v-if="this.form" class="d-flex-column gap-1">
            <label for="email" style="color: #fff">Email</label>
            <InputText
              id="email"
              v-model="form.email"
              class="flex-auto"
              style="width: 300px"
              autocomplete="off"
            />
          </div>
          <Button label="Изменить пароль" text @click="isEditPassModal = true" />
          <Button :loading="updatindUserProcess" type="button" label="Сохранить" @click="updateUser" style="width: 160px" />
        </div>
      </div>
    </div>
    <div v-if="activeTab === 2" class="container">
      <div class="text-white mt-20 text-center w100%">Получайте 5% от сумм пополнений, совершённых пользователями,<br>которых вы пригласили, используя эту уникальную ссылку:</div>
    <div v-if="store.user?.uuid" class="d-flex mt-7 w-100% justify-center items-center gap-10">
      <div class="text-white">{{`https://p.avigroup.site/k?r=${store.user?.uuid}`}}</div>
      <Button
          :label="!isWritedText ? 'Copy' : 'Copied'"
          class="w-30"
          @click="writeClipboardText"
      />
    </div>
    <div v-if="referrals.length" class="d-flex-column mt-20">
      <Card>
        <template #title>Приведенные пользователи</template>
        <template #content>
          <div v-for="referral in referrals" :key="referral.id">
            {{ referrals.indexOf(referral) || 0 + 1 }}. {{ referral?.name }}
          </div>
          <p class="m-0"></p>
        </template>
      </Card>
    </div>
    </div>
    <Dialog
      v-model:visible="isEditPassModal"
      modal
      header="Изменение пароля"
      :style="{ width: '35rem', height: '350px' }"
    >
    <div class="d-flex-column" style="justify-content: space-between">
    <div class="d-flex-column">
      <div class="flex align-items-center gap-3 mb-3">
        <label for="oldPassword" class="font-semibold w-10rem">Старый пароль</label>
        <Password id="oldPassword" v-model="formForPass.oldPassword" class="flex-auto" :feedback="false" toggleMask />
      </div>
      <div class="flex align-items-center gap-3 mb-3">
        <label for="password" class="font-semibold w-10rem">Новый пароль</label>
        <Password id="password" v-model="formForPass.password" class="flex-auto" :feedback="false" toggleMask />
      </div>
      <div class="flex align-items-center gap-3 mb-3">
        <label for="password2" class="font-semibold w-10rem">Повторите пароль</label>
        <Password id="password2" v-model="formForPass.password2" class="flex-auto" :feedback="false" toggleMask />
      </div>
      <span style="color: red" v-if="formForPass.password2 && formForPass.password && formForPass.password2 !== formForPass.password">Пароли не совпадают</span>
    </div>
      <div class="flex justify-content-end mt-8">
        <Button
          type="button"
          :loading="addAccountProcess"
          class="w50"
          label="Изменить"
          :disabled="!formForPass.password2 || formForPass.password2 !== formForPass.password"
          @click="onEditPass"
        ></Button>
      </div>
    </div>
    </Dialog>
  </main>
</template>
<script>
import { useUserStore } from '@/stores/user'
import {updateUser} from '@/api/user'
import { getReferrals } from '@/api/referrals'
import {getMe} from '@/api/login'
export default {
  data() {
    return {
      store: useUserStore(),
      items: [
        { id: 1, label: 'Пользователь', icon: 'pi pi-home' },
        { id: 2, label: 'Реферальная система', icon: 'pi pi-chart-line' },
      ],
      form: null,
      formForPass: {
        oldPassword: null,
        password: null,
        password2: null,
      },
      updatindUserProcess: false,
      isEditPassModal: false,
      activeTab: 1,
      referrals: []
    }
  },

  mounted() {
    this.getMe();
    this.getReferrals();
  },

  methods: {
    async updateUser() {
      this.updatindUserProcess = true;
      const data = {
        name: this.form.name,
        email: this.form.email
      }
      try {
        const res = await updateUser(data)
        this.getMe()
      }
      catch(e) {
        console.error(e);
      }
      this.updatindUserProcess = false;
    },
    async getMe() {
      try {
        const res = await getMe()
        this.form = JSON.parse(JSON.stringify(res))
        this.store.user = JSON.parse(JSON.stringify(res))
      }
      catch(e) {
        console.error(e);
      }
    },
    async onEditPass() {
      const data = {
        oldPassword: this.formForPass.oldPassword,
        password: this.formForPass.password
      }
      try {
        const res = await updateUser(data)
        this.isEditPassModal = false
      }
      catch(e) {
        console.error(e);
      }
    },
    async writeClipboardText() {
      try {
        await navigator.clipboard.writeText(`https://p.avigroup.site/k?r=${this.store.user?.uuid}`)
        this.isWritedText = true
        setTimeout(() => {
          this.isWritedText = false
        }, 2000)
      } catch (error) {
        console.error(error.message)
      }
    },
    async getReferrals() {
      try {
        const res = await getReferrals()
        this.referrals = res
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
}
.container {
  padding: 12px;
  width: 100%;
  height: 500px;
  /* From https://css.glass */
  background: var(--background-color);
  border-radius: 0 8px 8px 8px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4.9px);
  -webkit-backdrop-filter: blur(4.9px);
  border: 1px solid var(--border-color);
}
</style>
