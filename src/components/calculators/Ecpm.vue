<template>
<Card class="card">
      <template #content>
        <div class="d-flex gap-4">
          ДОХОДЫ ОТ ПРОДАЖИ РЕКЛАМЫ
          <InputNumber v-model="form.count1" inputId="minmax" />
          КОЛИЧЕСТВО ПОКАЗОВ
          <InputNumber v-model="form.count2" inputId="minmax" />
        </div>
      </template>
      <template #footer>
        <b>ECPM</b><h4>{{ result || 0 }} P</h4>
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
    return (this.form.count1 / this.form.count2) * 1000
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