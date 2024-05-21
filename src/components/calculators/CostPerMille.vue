<template>
<Card class="card">
      <template #content>
        <div class="d-flex gap-4">
          СТОИМОСТЬ РАЗМЕЩЕНИЯ
          <InputNumber v-model="form.count1" inputId="minmax" />
          КОЛИЧЕСТВО ПОКАЗОВ
          <InputNumber v-model="form.count2" inputId="minmax" />
          <!-- <Button
            type="button"
            label="Рассчитать"
            style="flex-shrink: 0; width: fit-content"
            @click="percent1"
          /> -->
        </div>
      </template>
      <template #footer>
        <b>CPM</b><h4>{{ result || 0 }} Р</h4>
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