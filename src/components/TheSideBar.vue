<template>
  <div class="menu">
    <div class="logo pointer mb-2" @click="$router.push({ name: 'home' })">AviGroup</div>
    <router-link
      v-for="link in menuItems"
      :key="link"
      class="menu-item d-flex gap-2"
      :class="{ active: link.value === $route.name }"
      :to="{ name: link.value }"
    >
      {{ link.name }}
    </router-link>
  </div>
</template>
<script>
export default {
  name: 'TheSideBar',
  data() {
    return {
      menuItems: [
        {
          id: 1,
          name: 'Чат-GPT',
          value: 'chatGpt'
        },
        {
          id: 2,
          name: 'Генератор текста',
          value: 'randomizerText'
        },
        // {
        //   id: 3,
        //   name: 'Рандомайзер изображений',
        //   value: 'randomizeImage'
        // },
        {
          id: 4,
          name: 'Создать таблицу',
          value: 'autoloader'
        },
        {
          id: 5,
          name: 'Парсер',
          value: 'parser'
        },
        {
          id: 6,
          name: 'Центр сообщений',
          value: 'chatsList'
        },
        {
          id: 7,
          name: 'Автоответчик',
          value: 'autoReplies'
        },
        {
          id: 8,
          name: 'Дополнительно',
          value: 'calculators'
        },
        {
          id: 9,
          name: 'Статистика',
          value: 'stats'
        },
        {
          id: 10,
          name: 'История транзакций',
          value: 'history'
        },
        {
          id: 11,
          name: 'Аккаунты',
          value: 'accounts'
        },
        {
          id: 12,
          name: 'Реферальная система',
          value: 'referrals'
        },
        {
          id: 13,
          name: 'Настройки',
          value: 'settings'
        }
      ]
    }
  }
}
</script>
<style scoped lang="scss">
.menu {
  display: flex;
  flex-direction: column;
  background-color: #2425253f;
  width: 300px;
  flex-shrink: 0;
  color: #f3f3f3;
  padding-top: 12px;
  border-radius: 8px;

  & .logo {
    padding: 0 20px;
    font-size: 22px;
    color: var(--vt-c-white);
  }

  & a {
    color: #d6d6d6;
    margin: 2px 20px;
    border-radius: 8px;
  }

  & .active {
    color: #d6d6d6;
    background-color: #0d1810d6;
    &:hover {
      color: #d6d6d6;
      background-color: #0d18106f;
    }
  }

  &-item {
    padding: 8px 20px;
    cursor: pointer;

    &:hover {
      color: #fff;
      background-color: #0d18106f;
    }
  }
}
</style>
