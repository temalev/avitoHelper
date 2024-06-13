
<template>
    <main>
      <div class="cardsContainer">
      <div v-for="calc in calculators" :key="calc.id" class="calcCard" @click="$router.push({name: calc.type, params: { calcType: calc.type }})">
        <div class="d-flex align-flex-start gap-4">
          <img :src="`/src/assets/icons/${calc.ico}.svg`" width="80px" height="80px" alt="">
          <div class="d-flex-column">
            <h3>{{ calc.name }}</h3>
            <span>{{ calc.description }}</span>
          </div>
        </div>
      </div>
    </div>
    </main>
</template>
<script>

export default {
  data() {
    return {
      calculators: [
        {
          id: 1,
          ico: 'calculator',
          type: 'calculator',
          name: 'Калькулятор процентов',
          description: 'Поможет произвести простые вычисления с числами и процентами'
        },
        {
          id: 2,
          ico: 'return-on-investment',
          type: 'return-on-investment',
          name: 'Калькулятор ROI',
          description: 'Позволяет вычислить доход от вложений к сумме вложенных средств'
        },
        {
          id: 3,
          ico: 'romi',
          type: 'romi',
          name: 'Калькулятор ROMI',
          description: 'Помогает рассчитать эффективность рекламных кампаний за вычетом расходов на маркетинг'
        },
        {
          id: 4,
          ico: 'ltv',
          type: 'ltv',
          name: 'Калькулятор LTV',
          description: 'Позволяет вычислить прибыль от отношений с клиентом за весь период'
        },
        {
          id: 5,
          ico: 'click-through-rate',
          type: 'click-through-rate',
          name: 'Калькулятор CTR',
          description: 'Показывает процентное соотношение кликов к просмотрам'
        },
        {
          id: 6,
          ico: 'cost-per-mille',
          type: 'cost-per-mille',
          name: 'Калькулятор CPM',
          description: 'Позволяет вычислить стоимость тысячи показов вашего рекламного объявления'
        },
        {
          id: 7,
          ico: 'cpa',
          type: 'cpa',
          name: 'Калькулятор CPA',
          description: 'Поможет посчитать стоимость целевого действия на сайте'
        },
        {
          id: 8,
          ico: 'cost-per-click',
          type: 'cost-per-click',
          name: 'Калькулятор CPC',
          description: 'Поможет произвести расчет СРС и рекомендуемого показателя CPC для рекламных объявлений'
        },
        {
          id: 9,
          ico: 'ecpm',
          type: 'ecpm',
          name: 'Калькулятор eCPM',
          description: 'Позволяет произвести расчет эффективной цены за 1000 показов для рекламных объявлений'
        },
        {
          id: 10,
          ico: 'cost-per-order',
          type: 'cost-per-order',
          name: 'Калькулятор CPO',
          description: 'Помогает рассчитать стоимость оформления заказа (покупки)'
        },
        {
          id: 11,
          ico: 'cac',
          type: 'cac',
          name: 'Калькулятор CAC',
          description: 'Помогает оценить, во сколько вам обходится привлечение одного клиента.'
        },
        {
          id: 12,
          ico: 'cac',
          type: 'cpl',
          name: 'Калькулятор CPL',
          description: 'Позволяет рассчитать стоимость привлечения одного лида'
        },
        {
          id: 13,
          ico: 'profit',
          type: 'profit',
          name: 'Калькулятор AOV',
          description: 'Помогает рассчитать сумму, которую в среднем тратят клиенты на товары и услуги'
        },
        {
          id: 14,
          ico: 'roas',
          type: 'roas',
          name: 'Калькулятор ROAS',
          description: 'Поможет рассчитать рентабельность инвестиций в рекламу'
        },
        {
          id: 15,
          ico: 'bid',
          type: 'bid',
          name: 'Корректировка ставок',
          description: 'Поможет произвести расчет корректировки ставок для рекламных кампаний.'
        },
        {
          id: 16,
          ico: 'drr',
          type: 'drr',
          name: 'Доля Рекламных Расходов (ДРР)',
          description: 'Показывает отношение расходов на рекламу к доходам от продаж'
        },
        {
          id: 17,
          ico: 'conversion',
          type: 'conversion',
          name: 'Калькулятор Конверсии',
          description: 'Определяет отношение посетителей, выполнивших целевые действия, к общему числу посетителей'
        },
        {
          id: 18,
          ico: 'ltv',
          type: 'marginality',
          name: 'Калькулятор Маржинальности',
          description: 'Поможет рассчитать разницу между ценой товара и его себестоимостью'
        },
        {
          id: 19,
          ico: 'out',
          type: 'out',
          name: 'Калькулятор оттока клиентов',
          description: 'Рассчитает потерю покупателей, которые пользовались продуктом, но потом перестали платить.'
        }
      ]
    }
  },
  mounted(){
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;
  background-color: inherit;
  width: 100%;
  // min-height: 100vh;
  overflow-x: auto;
}

.cardsContainer {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.calcCard {
  padding: 20px;
  border: 1px solid var(--border-color);
  background-color: var(--background-color);
  border-radius: 12px;
  width: 500px;
  cursor: pointer;
  color: var(--vt-c-white);

  &:hover {
    box-shadow: 0 0 8px 5px var(--background-color);
    border-color: var(--border-color-hover);
  }
}
</style>
