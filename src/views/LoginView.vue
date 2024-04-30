<template>
  <div class="page">
    <Dialog v-model:visible="visible" modal header="Регистрация" :style="{ width: '25rem' }">
      <span class="p-text-secondary block mb-5">Заполните все поля</span>
      <div class="flex align-items-center gap-3 mb-3">
        <label for="username" class="font-semibold w-6rem">Имя</label>
        <InputText id="name" v-model="form.name" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex align-items-center gap-3 mb-3">
        <label for="email" class="font-semibold w-6rem">Email</label>
        <InputText id="email" v-model="form.email" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex align-items-center gap-3 mb-5">
        <label for="email" class="font-semibold w-6rem">Пароль</label>
        <Password id="password" v-model="form.password" class="flex-auto" toggleMask />
      </div>
      <div class="flex justify-content-end">
        <Button type="button" :loading="signUpProcess" class="w100" label="Зарегистрироваться" @click="onSignUp"></Button>
      </div>
    </Dialog>
    <Dialog v-model:visible="visibleSignInModal" modal header="Войти" :style="{ width: '25rem' }" @close="redirectTo()">
      <span class="p-text-secondary block mb-5">Заполните все поля</span>
      <div class="flex align-items-center gap-3 mb-5">
        <label for="email" class="font-semibold w-6rem">Email</label>
        <InputText id="email" v-model="form.email" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex align-items-center gap-3 mb-5">
        <label for="email" class="font-semibold w-6rem">Пароль</label>
        <Password v-model="form.password" toggleMask :feedback="false" />
      </div>
      <div class="flex justify-content-end gap-2">
        <Button
          type="button"
          label="Отмена"
          severity="secondary"
          style="width: 100%"
          @click="redirectTo"
        ></Button>
        <Button
          label="Регистрация"
          icon="pi pi-user"
          style="flex-shrink: 0"
          @click="visible = true"
        />
        <Button type="button" label="Войти" style="flex-shrink: 0" @click="onSignIn"></Button>
      </div>
    </Dialog>
    <Dialog v-model:visible="showSuccessModal" modal header="Регистрация прошла успешно!">
      На указанную почту отправлена ссылка для подтверждения
    </Dialog>
  </div>
</template>
<script>
import { signUp, signIn } from '@/api/login'
export default {
  data() {
    return {
      visible: false,
      visibleSignInModal: true,
      form: {
        name: '',
        email: '',
        password: ''
      },
      signUpProcess: false,
      showSuccessModal: false,
    }
  },
  methods: {
    // TODO: Валидация полей
    async onSignUp() {
      this.signUpProcess = true;
      try {
        const res = await signUp(this.form)
        this.showSuccessModal = true
      }
      catch(e) {
        console.error(e);
      }
      this.signUpProcess = false;
    },

    async onSignIn() {
      const data = {
        email: this.form.email,
        password: this.form.password
      }
      try {
        const res = await signIn(data)
        this.$router.push('/')
      } catch (e) {
        console.error(e)
      }
    },
    redirectTo() {
      window.open('https://avi_group.tilda.ws')
    }
  }
}
</script>
<style></style>
