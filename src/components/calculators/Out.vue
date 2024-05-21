<template>
<Card class="card">
      <template #content>
        <div class="d-flex gap-4">
          КОЛИЧЕСТВО КЛИЕНТОВ ЗА ПРОШЛЫЙ ПЕРИОД
          <InputNumber v-model="form.count1" inputId="minmax" />
          КОЛИЧЕСТВО НОВЫХ КЛИЕНТОВ ЗА ПЕРИОД
          <InputNumber v-model="form.count2" inputId="minmax" />
          КОЛИЧЕСТВО КЛИЕНТОВ НА КОНЕЦ ТЕКУЩЕГО ПЕРИОДА
          <InputNumber v-model="form.count3" inputId="minmax" />
        </div>
      </template>
      <template #footer>
        <b>ОТТОК</b><h4>{{ result || 0 }} %</h4>
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
    return ((this.form.count1 + this.form.count2 - this.form.count3) / this.form.count1) * 100
  }
}
}
</script>
<style scoped>

</style>