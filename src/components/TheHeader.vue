<template>
<header>
  <div class="logo">aviGroup</div>
  <div class="user">
    <Avatar :label="firstWord" class="mr-2" style="background-color: #ece9fc; color: #2a1261" />
    {{ store.user.name }}
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
  background-color: #fff;
  border-bottom: 1px solid #acb0cdad;
  z-index: 10000;

  .logo {
    color: #0c0c0c;
    margin: 16px 0px;
    font-size: 24px;
  }
}
</style>