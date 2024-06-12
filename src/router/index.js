import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        name: 'home',
        title: 'Домашняя страница'
      },
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        name: 'login'
      },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/chatGpt',
      name: 'chatGpt',
      meta: {
        name: 'chatGpt',
        title: 'Чат-GPT'
      },
      component: () => import('../views/chatGpt.vue')
    },
    {
      path: '/randomizerText',
      name: 'randomizerText',
      meta: {
        name: 'randomizerText',
        title: 'Рандомизатор текста'
      },
      component: () => import('../views/randomizerText.vue')
    },
    {
      path: '/autoloader',
      name: 'autoloader',
      meta: {
        name: 'autoloader',
        title: 'Создание файлов автозагрузки'
      },
      component: () => import('../views/AutoLoader.vue')
    },
    {
      path: '/parser',
      name: 'parser',
      meta: {
        name: 'parser',
        title: 'Сборщик объявлений авито'
      },
      component: () => import('../views/Parser.vue')
    },
    {
      path: '/chats',
      name: 'chats',
      props: true,
      meta: {
        name: 'chats',
        title: 'Авито сообщения'
      },
      component: () => import('../views/ChatsRoute.vue'),
      children: [
        {
          path: 'list',
          name: 'chatsList',
          meta: {
            name: 'chatsList',
            title: 'Авито сообщения'
          },
          component: () => import('../views/Chats.vue')
        },
        {
          path: ':chatId/:accountId',
          name: 'chat',
          props: true,
          meta: {
            name: 'chat',
            title: 'Авито сообщения'
          },
          component: () => import('../views/Chat.vue')
        },
      ]
    },

    {
      path: '/auto-replies',
      name: 'autoReplies',
      meta: {
        name: 'autoReplies',
        title: 'Автоответы'
      },
      component: () => import('../views/autoReplies.vue')
    },

    {
      path: '/calculator',
      name: 'calculatorRoute',
      meta: {
        name: 'calculatorRoute',
        title: 'Кальк'
      },
      component: () => import('../views/CalculatorRoute.vue'),
      children: [
        {
          path: 'list',
          name: 'calculators',
          meta: {
            name: 'calculators',
            title: 'Инструменты для Маркетолога'
          },
          component: () => import('../views/Calculators.vue'),
          
        },
        {
          path: 'calc',
          name: 'calc',
          meta: {
            name: 'calc',
            title: 'Калькулятор'
          },
          component: () => import('../views/Calculator.vue'),
          children: [
            {
              path: 'calculator',
              name: 'calculator',
              meta: {
                name: 'calculator',
                title: 'Калькулятор процентов'
              },
              component: () => import('../components/calculators/Сalculator.vue'),
            },
            {
              path: 'return-on-investment',
              name: 'return-on-investment',
              meta: {
                name: 'return-on-investment',
                title: 'Калькулятор ROI'
              },
              component: () => import('../components/calculators/ReturnOnInvestment.vue'),
            },
            {
              path: 'romi',
              name: 'romi',
              meta: {
                name: 'romi',
                title: 'Калькулятор ROMI'
              },
              component: () => import('../components/calculators/Romi.vue'),
            },
            {
              path: 'ltv',
              name: 'ltv',
              meta: {
                name: 'ltv',
                title: 'Калькулятор LTV'
              },
              component: () => import('../components/calculators/Ltv.vue'),
            },
            {
              path: 'click-through-rate',
              name: 'click-through-rate',
              meta: {
                name: 'click-through-rate',
                title: 'Калькулятор CTR'
              },
              component: () => import('../components/calculators/ClickThroughRate.vue'),
            },
            {
              path: 'cost-per-mille',
              name: 'cost-per-mille',
              meta: {
                name: 'cost-per-mille',
                title: 'Калькулятор CPM'
              },
              component: () => import('../components/calculators/CostPerMille.vue'),
            },
            {
              path: 'cpa',
              name: 'cpa',
              meta: {
                name: 'cpa',
                title: 'Калькулятор CPA'
              },
              component: () => import('../components/calculators/Cpa.vue'),
            },
            {
              path: 'cost-per-click',
              name: 'cost-per-click',
              meta: {
                name: 'cost-per-click',
                title: 'Калькулятор CPC'
              },
              component: () => import('../components/calculators/CostPerClick.vue'),
            },
            {
              path: 'ecpm',
              name: 'ecpm',
              meta: {
                name: 'ecpm',
                title: 'Калькулятор eCPM'
              },
              component: () => import('../components/calculators/Ecpm.vue'),
            },
            {
              path: 'cost-per-order',
              name: 'cost-per-order',
              meta: {
                name: 'cost-per-order',
                title: 'Калькулятор CPO'
              },
              component: () => import('../components/calculators/CostPerOrder.vue'),
            },
            {
              path: 'cac',
              name: 'cac',
              meta: {
                name: 'cac',
                title: 'Калькулятор CAC'
              },
              component: () => import('../components/calculators/Cac.vue'),
            },
            {
              path: 'cpl',
              name: 'cpl',
              meta: {
                name: 'cpl',
                title: 'Калькулятор CPL'
              },
              component: () => import('../components/calculators/Cpl.vue'),
            },
            {
              path: 'profit',
              name: 'profit',
              meta: {
                name: 'profit',
                title: 'Калькулятор AOV'
              },
              component: () => import('../components/calculators/Profit.vue'),
            },
            {
              path: 'roas',
              name: 'roas',
              meta: {
                name: 'roas',
                title: 'Калькулятор ROAS'
              },
              component: () => import('../components/calculators/Roas.vue'),
            },
            {
              path: 'bid',
              name: 'bid',
              meta: {
                name: 'roas',
                title: 'Корректировка ставок'
              },
              component: () => import('../components/calculators/Bid.vue'),
            },
            {
              path: 'drr',
              name: 'drr',
              meta: {
                name: 'drr',
                title: 'Доля Рекламных Расходов (ДРР)'
              },
              component: () => import('../components/calculators/Drr.vue'),
            },
            {
              path: 'conversion',
              name: 'conversion',
              meta: {
                name: 'conversion',
                title: 'Калькулятор Конверсии'
              },
              component: () => import('../components/calculators/Conversion.vue'),
            },
            {
              path: 'marginality',
              name: 'marginality',
              meta: {
                name: 'marginality',
                title: 'Калькулятор Маржинальности'
              },
              component: () => import('../components/calculators/Marginality.vue'),
            },
            {
              path: 'out',
              name: 'out',
              meta: {
                name: 'out',
                title: 'Калькулятор оттока клиентов'
              },
              component: () => import('../components/calculators/Out.vue'),
            },
          ]
        },
      ]
    },

    {
      path: '/stats',
      name: 'stats',
      meta: {
        name: 'stats',
        title: 'Статистика'
      },
      component: () => import('../views/Stats.vue')
    },

    {
      path: '/accounts',
      name: 'accounts',
      meta: {
        name: 'accounts',
        title: 'Аккаунты'
      },
      component: () => import('../views/Accounts.vue')
    },

    {
      path: '/referrals',
      name: 'referrals',
      meta: {
        name: 'referrals',
        title: 'Реферальная система'
      },
      component: () => import('../views/Referrals.vue')
    },

    {
      path: '/history',
      name: 'history',
      meta: {
        name: 'history',
        title: 'История транзакций'
      },
      component: () => import('../views/History.vue')
    },
    
    {
      path: '/settings',
      name: 'settings',
      meta: {
        name: 'settings',
        title: 'Настройки'
      },
      component: () => import('../views/Settings.vue')
    },
    {
      path: '/confirm',
      name: 'confirm',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ConfirmView.vue'),
      children: [
        {
          path: 'email/:uuid',
          name: 'email',
          meta: {
            title: 'email',
          },
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('../views/ConfirmType.vue')
        }
      ]
    }
  ]
})

export default router
