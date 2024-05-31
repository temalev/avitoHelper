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
      <div class="flex align-items-center gap-3 mb-5">
        <label for="email" class="font-semibold w-6rem">Email</label>
        <InputText id="email" v-model="form.email" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex align-items-center gap-3 mb-5">
        <label for="email" class="font-semibold w-6rem">Пароль</label>
        <Password v-model="form.password" toggleMask :feedback="false" />
      </div>

      <div class="flex justify-content-end mt-2">
        <Button type="button" label="Войти" style="flex-shrink: 0; width: 350px" @click="onSignIn"></Button>
      </div>

      <div class="d-flex gap-10 margin-top-10" style="justify-content: space-around; margin-top: 15px">
        <a class="pointer color-gray" @click="visible = true" style="width: fit-content">Регистрация</a>
        <a class="pointer color-gray" @click="showRecoveryPassModal = true" style="width: fit-content;">Забыли пароль</a>
      </div>
    </Dialog>
    <Dialog v-model:visible="showRecoveryPassModal" modal header="Восстановить пароль" :style="{ width: '25rem' }">
      <span class="p-text-secondary block mb-5">Укажите email к которому привязана учетная запись</span>
      <div class="flex align-items-center gap-3 mb-3">
        <label for="email" class="font-semibold w-6rem">Email</label>
        <InputText id="email" v-model="recoveryForm.email" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex justify-content-end mt-8">
        <Button type="button" :loading="recoveryPassProcess" class="w100" label="Отправить письмо с инструкцией" @click="onRecoveryPass"></Button>
      </div>
    </Dialog>
    <Dialog v-model:visible="showSuccessModal" modal header="Регистрация прошла успешно!">
      На указанную почту отправлена ссылка для подтверждения
    </Dialog>
  </div>
</template>
<script>
import { signUp, signIn } from '@/api/login'
import { recoverPass } from '@/api/recovery-password'

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
      recoveryForm: {
        email: ''
      },
      signUpProcess: false,
      recoveryPassProcess: false,
      showSuccessModal: false,
      showRecoveryPassModal: false,
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

    async onRecoveryPass() {
      this.recoveryPassProcess = true;
      try {
        const res = await recoverPass({email: this.recoveryForm.email})
        console.log(res);
      }
      catch(e) {
        console.error(e);
      }
      this.recoveryPassProcess = false;

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
