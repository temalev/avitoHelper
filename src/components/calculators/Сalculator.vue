<template>
  <div class="cards">
    <Card class="card">
      <template #title>ПРОЦЕНТ ОТ ЧИСЛА</template>
      <template #content>
        <div class="d-flex gap-4">
          процент
          <InputNumber v-model="form1.count1" inputId="minmax" />
          от
          <InputNumber v-model="form1.count2" inputId="minmax" />
          <Button
            type="button"
            label="Рассчитать"
            style="flex-shrink: 0; width: fit-content"
            @click="percent1"
          />
        </div>
      </template>
      <template #footer>
        <h4>{{ this.form1.return }}</h4>
      </template>
    </Card>
    <Card class="card">
      <template #title>СКОЛЬКО ПРОЦЕНТОВ СОСТАВЛЯЕТ ЧИСЛО ОТ ЧИСЛА</template>
      <template #content>
        <div class="d-flex gap-4">
          число
          <InputNumber v-model="form2.count1" inputId="minmax" />
          от
          <InputNumber v-model="form2.count2" inputId="minmax" />
          числа
          <Button
            type="button"
            label="Рассчитать"
            style="flex-shrink: 0; width: fit-content"
            @click="percent2"
          />
        </div>
      </template>
      <template #footer>
        <h4>{{ this.form2.return }}</h4>
      </template>
    </Card>
    <Card class="card">
      <template #title>ПРИБАВИТЬ ПРОЦЕНТ К ЧИСЛУ</template>
      <template #content>
        <div class="d-flex gap-4">
          прибавить % 
          <InputNumber v-model="form3.count1" inputId="minmax" />
          к
          <InputNumber v-model="form3.count2" inputId="minmax" />
          числу
          <Button
            type="button"
            label="Рассчитать"
            style="flex-shrink: 0; width: fit-content"
            @click="percent3"
          />
        </div>
      </template>
      <template #footer>
        <h4>{{ this.form3.return }}</h4>
      </template>
    </Card>
    <Card class="card">
      <template #title>ВЫЧЕСТЬ ПРОЦЕНТ ИЗ ЧИСЛА</template>
      <template #content>
        <div class="d-flex gap-4">
          вычесть % 
          <InputNumber v-model="form4.count1" inputId="minmax" />
          к
          <InputNumber v-model="form4.count2" inputId="minmax" />
          числу
          <Button
            type="button"
            label="Рассчитать"
            style="flex-shrink: 0; width: fit-content"
            @click="percent4"
          />
        </div>
      </template>
      <template #footer>
        <h4>{{ this.form4.return }}</h4>
      </template>
    </Card>
    <Card class="card">
      <template #title>НА СКОЛЬКО ПРОЦЕНТОВ ОДНО ЧИСЛО БОЛЬШЕ ДРУГОГО</template>
      <template #content>
        <div class="d-flex gap-4">
          на сколько % число
          <InputNumber v-model="form5.count1" inputId="minmax" />
          больше
          <InputNumber v-model="form5.count2" inputId="minmax" />
          числа
          <Button
            type="button"
            label="Рассчитать"
            style="flex-shrink: 0; width: fit-content"
            @click="percent5"
          />
        </div>
      </template>
      <template #footer>
        <h4>{{ this.form5.return }}</h4>
      </template>
    </Card>
    <Card class="card">
      <template #title>НА СКОЛЬКО ПРОЦЕНТОВ ОДНО ЧИСЛО МЕНЬШЕ ДРУГОГО</template>
      <template #content>
        <div class="d-flex gap-4">
          на сколько % число
          <InputNumber v-model="form6.count1" inputId="minmax" />
          меньше
          <InputNumber v-model="form6.count2" inputId="minmax" />
          числа
          <Button
            type="button"
            label="Рассчитать"
            style="flex-shrink: 0; width: fit-content"
            @click="percent6"
          />
        </div>
      </template>
      <template #footer>
        <h4>{{ this.form6.return }}</h4>
      </template>
    </Card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form1: {
        count1: 0,
        count2: 0,
        return: null
      },
      form2: {
        count1: 0,
        count2: 0,
        return: null
      },
      form3: {
        count1: 0,
        count2: 0,
        return: null
      },
      form4: {
        count1: 0,
        count2: 0,
        return: null
      },
      form5: {
        count1: 0,
        count2: 0,
        return: null
      },
      form6: {
        count1: 0,
        count2: 0,
        return: null
      }
    }
  },
  computed: {},
  methods: {
    percent1() {
     this.form1.return = (this.form1.count2 / 100) * this.form1.count1
    },
    percent2() {
      const ratio = this.form2.count2 / this.form2.count1
       this.form2.return = 100 / ratio
    },
    percent3() {
      const percent = (this.form3.count2 / 100) * this.form3.count1
       this.form3.return = this.form3.count2 + percent
    },
    percent4() {
      const percent = (this.form4.count2 / 100) * this.form4.count1
       this.form4.return = this.form4.count2 - percent
    },
    percent5() {
       this.form5.return = (this.form5.count1 - this.form5.count2) / this.form5.count2 * 100
    },
    percent6() {
       this.form6.return = (this.form6.count2 - this.form6.count1) / this.form6.count2 * 100
    },
  }
}
</script>
<style scoped>

.cards {
  overflow-x: auto;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.card {
  width: 900px;
  height: 200px;
}

.calc {
  background-color: #fff;
  border-radius: 12px;
  padding: 20px;
}
</style>
