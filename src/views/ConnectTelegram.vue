<template>
<div class="">
  <Card class="m-3">
    <template #title v-if="waitForRequest"></template>
    <template #content>
      <div v-if="waitForRequest">Подключение...</div>
      <div v-if="!waitForRequest">
        <div v-if="isSuccess">Telegram аккаунт подключен</div>
        <div v-if="!isSuccess">Произошла ошибка{{error ? ': ' + error : ''}}</div>
      </div>
    </template>
</Card>

</div>
</template>
<script>
import { connectTelegram } from '@/api/telegram'
export default {
  data() {
    return {
      isSuccess: false,
      waitForRequest: true,
      error: null
    }
  },
  mounted() {
    this.onConnect()
  },
  methods: {
    // TODO: Валидация полей
    async onConnect() {
      try {
        await connectTelegram(this.$route.params.uuid)
        this.isSuccess = true
      } catch (e) {
        this.error = e
        this.isSuccess = false
      } finally {
        this.waitForRequest = false
      }
    }
  }
}
</script>
<style scoped>

</style>