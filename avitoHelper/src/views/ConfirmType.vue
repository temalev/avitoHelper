<template>
<div class="">
  {{ $route.meta.title }}
  {{$route.params.uuid}}
  <Button @click="onConfirm">Подтвердить</Button>
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