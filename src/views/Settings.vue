<template>
  <main>
    <TheTabs :data="items" />
    <div class="container">
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
          <Button label="Изменить пароль" text />
          <Button :loading="updatindUserProcess" type="button" label="Сохранить" @click="updateUser" style="width: 160px" />
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import { useUserStore } from '@/stores/user'
import {updateUser} from '@/api/user'
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
      updatindUserProcess: false,
    }
  },

  mounted() {
    this.getMe()
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
