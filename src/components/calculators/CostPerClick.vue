<template>
  <div class="d-flex-column gap-4">
<Card class="card">
  <template #title>
    РАССЧИТАТЬ CPC
  </template>
      <template #content>
        <div class="d-flex gap-4">
          БЮДЖЕТ
          <InputNumber v-model="form1.count1" inputId="minmax" />
          КОЛ-ВО КЛИКОВ
          <InputNumber v-model="form1.count2" inputId="minmax" />
        </div>
      </template>
      <template #footer>
        <b>CPC</b><h4>{{ result1 || 0 }} Р</h4>
      </template>
    </Card>
    <Card class="card">
      <template #title>
        РАССЧИТАТЬ РЕКОМЕНДУЕМУЮ СТАВКИ CPC
  </template>
      <template #content>
        <div class="d-flex gap-4">
          КОНВЕРСИЯ
          <InputNumber v-model="form2.count1" inputId="minmax" />
          СТОИМОСТЬ ЗАКАЗА
          <InputNumber v-model="form2.count2" inputId="minmax" />
        </div>
      </template>
      <template #footer>
        <b>CPC</b><h4>{{ result2 || 0 }} Р</h4>
      </template>
    </Card>
  </div>
</template>
<script>
export default {
data() {
  return {
    form1: {
      count1: null,
      count2: null,
      result: null
    },
    form2: {
      count1: null,
      count2: null,
      result: null
    }
  }
},
computed: {
  result1() {
    return this.form1.count1 / this.form1.count2
  },
  result2() {
    return (this.form2.count1 * this.form2.count2) / 100
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