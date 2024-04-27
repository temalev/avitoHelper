<template>
<header>
  <div class="logo pointer" @click="$router.push({name: 'home'})">{{ $route.meta.title }}</div>
  <div class="user" @click="toggle">
    <Avatar :label="firstWord" style="background-color: #ece9fc; color: #2a1261" />
    {{ store.user.name }}
    <div class="d-flex gap-4 rounded-lg" style="border: 1px solid #58dc13d3">
      <span class="ml-4">{{store.user.balance }} ₽</span>
      <div class="p-1-4 bg-[#58dc13d3] pointer" style="border-radius: inherit">Пополнить</div>
    </div>
  </div>
</header>
</template>
<script>
import { useUserStore } from '@/stores/user'
export default {
  data(){
    return {
      store: useUserStore()
    }
  },
  computed: {
    firstWord() {
      return this.store.user.name?.at()
    }
  },
  methods: {
    toggle(event) {
            this.$refs.op.toggle(event);
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