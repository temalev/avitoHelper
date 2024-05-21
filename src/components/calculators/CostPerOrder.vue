<template>
<Card class="card">
      <template #content>
        <div class="d-flex gap-4">
          ЗАТРАТЫ НА РЕКЛАМУ
          <InputNumber v-model="form.count1" inputId="minmax" />
          КОЛИЧЕСТВО НОВЫХ ЗАКАЗОВ
          <InputNumber v-model="form.count2" inputId="minmax" />
        </div>
      </template>
      <template #footer>
        <b>CPO</b><h4>{{ result || 0 }} P</h4>
      </template>
    </Card>
</template>
<script>
export default {
data() {
  return {
    form: {
      count1: null,
      count2: null,
      result: null
    }
  }
},
computed: {
  result() {
    return this.form.count1 / this.form.count2
  }
}
}
</script>
<style scoped>
.card {
  width: 900px;
  height: 200px;
}
</style>