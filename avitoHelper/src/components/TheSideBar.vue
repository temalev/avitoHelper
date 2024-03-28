<template>
<div class="menu">
  <div class="menu-item">Чат-GPT</div>
  <div class="menu-item">Рандомайзер текста</div>
  <div class="menu-item">Рандомайзер изображений</div>
  <div class="menu-item">Создание файлов автозагрузки</div>
</div>
</template>
<script>
export default {

}
</script>
<style scoped lang="scss">
.menu {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  width: 300px;
  height: 100%;
  color: #6e6e6e;
  border-right: 1px solid #acb0cdad;
  padding-top: 12px;

  &-item {
    padding: 8px 20px; 
    cursor: pointer;

    &:hover {
      color: #000000;
    }
  }
}
</style>