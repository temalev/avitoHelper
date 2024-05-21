<template>
<Card class="card">
      <template #content>
        <div class="d-flex gap-4">
          СРЕДНЯЯ ПРИБЫЛЬ C ПРОДАЖИ
          <InputNumber v-model="form.count1" inputId="minmax" />
          СРЕДНЕЕ ЧИСЛО ПРОДАЖ (В МЕСЯЦ)
          <InputNumber v-model="form.count2" inputId="minmax" />
          ВРЕМЯ УДЕРЖАНИЯ КЛИЕНТА (В МЕСЯЦАХ)
          <InputNumber v-model="form.count3" inputId="minmax" />
        </div>
      </template>
      <template #footer>
        <b>LTV</b><h4>{{ result || 0 }} Р</h4>
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
      count3: null,
      result: null
    }
  }
},
computed: {
  result() {
    return this.form.count1 * this.form.count2 * this.form.count3
  }
}
}
</script>
<style scoped>
.card {
}
</style>