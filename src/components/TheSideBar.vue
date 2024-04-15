<template>
<div class="menu">
  <router-link v-for="link in menuItems" :key="link" class="menu-item" :class="{'active': link.value === $route.name}" :to="{name: link.value}">{{ link.name }}</router-link>
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
  // height: 100%;
  // min-height: 100%;
  color: #6e6e6e;
  border-right: 1px solid #acb0cdad;
  padding-top: 12px;

  & a {
    color: #6e6e6e;
  }

  & .active {
    color: hsla(160, 100%, 37%, 1);
  }

  &-item {
    padding: 8px 20px; 
    cursor: pointer;

    &:hover {
      color: #000000;
    }
  }
}
</style>