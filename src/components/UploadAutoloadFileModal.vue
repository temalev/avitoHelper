<template>
  <Dialog v-model:visible="visible" modal header="Загрузка таблицы" :style="{ width: '35rem' }">
    <span class="p-text-secondary block mb-5">Заполните все поля</span>
    <div class="flex align-items-center gap-3 mb-3">
      <label for="username" class="font-semibold w-10rem">Авито аккаунт</label>
      <Dropdown
      v-model="form.id"
      :options="accounts"
      optionLabel="name"
      optionValue="id"
      placeholder="Выберите аккаунт"
      class="w-full md:w-14rem"
    />
    </div>
    <div class="flex align-items-center gap-3 mb-3">
      <label for="username" class="font-semibold w-10rem">Email</label>
      <InputText id="name" v-model="form.email" class="flex-auto" autocomplete="off" />
    </div>
    <Button
      style="width: 280px"
      @click="openFileAutoloadDialog"
      :loading="uploadFieldFileProcess"
      label="Загрузить и отправить"
    ></Button>
    <input
      hidden
      ref="openFileAutoloadDialog"
      type="file"
      id="avatar"
      name="avatar"
      accept=".txt,text/plain,.csv,text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
      @change="(e) => uploadFieldFile(e, field)"
    />
    <div v-if="completed" class="flex justify-content-end mt-4 gap-4">
      <InlineMessage severity="success">Файл успешно загружен</InlineMessage>
    </div>
  </Dialog>
</template>
<script>
import { uploadAutoloadFile } from '@/api/autoloader'
import { getAccounts } from '@/api/avitoAccount'
export default {
  data() {
    return {
      visible: true,
      uploadProcess: false,
      uploadFieldFileProcess: false,
      form: {
        email: null
      },
      accounts: [],
      completed: false,
    }
  },
  watch: {
    visible(val) {
      if (!val) {
        this.$emit('close')
      }
    }
  },
  mounted() {
    this.getAccounts() 
  },
  methods: {
    upload() {},
    openFileAutoloadDialog() {
      this.$refs.openFileAutoloadDialog.click()
    },
    async uploadFieldFile(e, field) {
      this.uploadFieldFileProcess = true
      const file = e.target.files
      const params = {
        email: this.form.email,
        isTest: true,
      }
      try {
        const res = await uploadAutoloadFile(this.form.id, file[0], params)
        this.completed = true
      } catch (e) {
        console.error(e)
        this.completed = false
      }
      this.uploadFieldFileProcess = false
    },
    async getAccounts() {
      try {
        const res = await getAccounts()
        this.accounts = res.accounts
      } catch (e) {
        console.error(e)
      }
    },
  }
}
</script>
<style scoped></style>
