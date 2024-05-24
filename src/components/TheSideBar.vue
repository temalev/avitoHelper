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
          name: 'Рандомайзер текста',
          value: 'randomizerText'
        },
        // {
        //   id: 3,
        //   name: 'Рандомайзер изображений',
        //   value: 'randomizeImage'
        // },
        {
          id: 4,
          name: 'Создание файлов автозагрузки',
          value: 'autoloader'
        },
        {
          id: 5,
          name: 'Парсинг',
          value: 'parser'
        },
        {
          id: 6,
          name: 'Авито сообщения',
          value: 'chatsList'
        },
        {
          id: 7,
          name: 'Автоответы',
          value: 'autoReplies'
        },
        {
          id: 8,
          name: 'Инструменты для Маркетолога',
          value: 'calculators'
        },
        {
          id: 9,
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
  background-color: #ffffff;
  width: 300px;
  flex-shrink: 0;
  color: #6e6e6e;
  padding-top: 12px;
  border-radius: 8px;

  & .logo {
    padding: 0 20px;
    font-size: 22px;
    color: #000;
  }

  & a {
    color: #6e6e6e;
    margin: 2px 20px;
    border-radius: 8px;
  }

  & .active {
    color: #fff;
    background-color: #1c55fc;
    &:hover {
      color: #fff;
      background-color: #1543cc;
    }
  }

  &-item {
    padding: 8px 20px;
    cursor: pointer;

    &:hover {
      color: #000000;
      background-color: #1c54fc15;
    }
  }
}
</style>
