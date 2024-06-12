<template>
  <header>
    <div class="logo pointer" @click="$router.push({ name: 'home' })">{{ $route.meta.title }}</div>
    <div class="user" @click="toggle">
      <img src="/src/assets/icons/head.svg" alt="" width="60px" height="60px">
      <span style="color: #fff"> {{ store.user?.name }}</span>
      <div class="d-flex gap-4 rounded-lg" style="border: 1px solid #1c55fc">
        <span class="ml-4" style="text-wrap: nowrap">{{ store.user?.balance }} ₽</span>
        <div
          class="p-1-4 bg-[#1c55fc] pointer"
          style="border-radius: inherit; color: white"
          @click="showPanel = true"
        >
          Пополнить
        </div>
      </div>
      <div
      @click="logout"
          class="ico pointer"
          style="
            backgroundImage: url(/src/assets/icons/logout.svg);
            width: 20px;
            height: 20px;
            color: #eee;
          "
        />
    </div>
    <Dialog v-model:visible="showPanel" modal header="Edit Profile" :style="{ width: '25rem' }">
      <template #header> Пополнить баланс </template>
      <span class="p-text-secondary block mb-5">Введите сумму и способ пополнения</span>
      <div class="flex align-center gap-3 mb-3">
        <label for="username" class="font-semibold w-6rem">Сумма</label>
        <InputNumber v-model="form.amount" inputId="integeronly" :min="500" />
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
import {logout} from '@/api/login'
import SvgIcon from '@/components/SvgIcon/index.vue'
export default {
  components: {SvgIcon},
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
      return this.store.user?.name?.at()
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
    },
    async logout() {
      try {
        await logout()
        window.open('https://avi_group.tilda.ws', '_self')
      }
      catch(e) {
        console.error(e)

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
    color: #fff;
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
