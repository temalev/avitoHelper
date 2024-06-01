<template>
<div class="">
  <Card class="m-3">
    <template #title>Почта подтверждена</template>
    <template #footer><Button @click="$router.push({name: 'loginView'})">Войти</Button></template>
</Card>

</div>
</template>
<script>
import { confirmEmail } from '@/api/login'
export default {
  data() {
    return {
    }
  },
  mounted() {
    this.onConfirm() 
  },
  methods: {
    // TODO: Валидация полей
    async onConfirm() {
      const res = await confirmEmail(this.$route.params.uuid)
      console.log(res);
    }
  }
}
</script>
<style scoped>

</style>