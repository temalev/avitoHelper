<template>
  <header>
    <div class="logo pointer" @click="$router.push({ name: 'home' })">{{ $route.meta.title }}</div>
    <div class="user" @click="toggle">
      <Avatar :label="firstWord" style="background-color: #ece9fc; color: #2a1261" />
      {{ store.user.name }}
      <div class="d-flex gap-4 rounded-lg" style="border: 1px solid #58dc13d3">
        <span class="ml-4">{{ store.user.balance }} ₽</span>
        <div
          class="p-1-4 bg-[#58dc13d3] pointer"
          style="border-radius: inherit"
          @click="showPanel = true"
        >
          Пополнить
        </div>
      </div>
    </div>
    <Dialog v-model:visible="showPanel" modal header="Edit Profile" :style="{ width: '25rem' }">
      <template #header> Пополнить баланс </template>
      <span class="p-text-secondary block mb-5">Введите сумму и способ пополнения</span>
      <div class="flex align-center gap-3 mb-3">
        <label for="username" class="font-semibold w-6rem">Сумма</label>
        <InputNumber v-model="form.amount" inputId="integeronly" />
      </div>
      <div class="d-flex-column align-items-center gap-3 mb-2">
        <label class="font-semibold ">Пополнить с помощью:</label>
        <div v-for="type in paymentType" :key="type.id" class="flex align-center">
          <RadioButton
            v-model="form.type_id"
            :inputId="type.id"
            name="dynamic"
            :value="type.id"
          />
          <label :for="type.id" class="ml-2">{{ type.name }}</label>
        </div>
      </div>
      <template #footer>
        <Button label="Отменить" text severity="secondary" @click="showPanel = false" />
        <Button label="Пополнить" outlined severity="secondary" @click="showPanel = false; onPayment()" autofocus />
      </template>
    </Dialog>
  </header>
</template>
<script>
import { useUserStore } from '@/stores/user'
import {payment} from '@/api/payment'
export default {
  data() {
    return {
      store: useUserStore(),
      showPanel: false,
      paymentType: [
        {
          id: 0,
          name: 'карты'
        },
        {
          id: 1,
          name: 'криптовалюты'
        }
      ],
      form: {
        amount: 0,
        type_id: 1
      }
    }
  },
  computed: {
    firstWord() {
      return this.store.user.name?.at()
    }
  },
  methods: {
    async onPayment() {
      try {
        const res = await payment(this.form)
        window.open(res);
      }
      catch(e) {
        console.error(e);
      }
    }
  }
}
</script>
<style scoped lang="scss">
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 52px;
  padding: 0 20px;
  z-index: 10000;

  .logo {
    color: #0c0c0c;
    margin: 16px 0px;
    font-size: 24px;
  }
}

.user {
  display: flex;
  align-items: center;
  gap: 12px;
}
</style>
