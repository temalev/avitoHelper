
<template>
  <div class="page">
    <Button label="Login" icon="pi pi-user" @click="visible = true" />

    <Dialog v-model:visible="visible" modal header="Регистрация" :style="{ width: '25rem' }">
    <span class="p-text-secondary block mb-5">Заполните все поля</span>
    <div class="flex align-items-center gap-3 mb-3">
        <label for="username" class="font-semibold w-6rem">Имя</label>
        <InputText id="name" v-model="form.name" class="flex-auto" autocomplete="off" />
    </div>
    <div class="flex align-items-center gap-3 mb-5">
        <label for="email" class="font-semibold w-6rem">Email</label>
        <InputText id="email" v-model="form.email" class="flex-auto" autocomplete="off" />
    </div>
    <div class="flex align-items-center gap-3 mb-5">
        <label for="email" class="font-semibold w-6rem">Пароль</label>
        <InputText id="password" v-model="form.password" class="flex-auto" autocomplete="off" />
    </div>
    <div class="flex justify-content-end gap-2">
        <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
        <Button type="button" label="Save" @click="onSignUp"></Button>
    </div>
</Dialog>
  </div>
</template>
<script>
import { signUp } from '@/api/login'
export default {
  data() {
    return {
      visible: false,
      form: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    // TODO: Валидация полей
    async onSignUp() {
      const res = await signUp(this.form)
      console.log(res);
    }
  }
}

</script>
<style>

</style>
