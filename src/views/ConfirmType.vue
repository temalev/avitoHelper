<template>
<div class="">
  <Card class="m-3">
    <template #title>Подтвердите Ваш {{$route.meta.title}}</template>
    <template #footer>  <Button @click="onConfirm">Подтвердить</Button></template>
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