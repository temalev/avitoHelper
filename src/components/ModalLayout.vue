<template>
<div class="layout" @click.self="$emit('close')">
  <div class="model" :style="{width: `${width}px`, height: `${height}px`}">
    <div class="header"></div>
    <Button label="Submit" />
  </div>
</div>
</template>
<script>
import Button from 'primevue/button';
export default {
name: 'ModalLayout',
components: {Button},
props: {
  width: {
    type: String,
    default: ''
  },
  height: {
    type: String,
    default: ''
  }
}
}
</script>
<style scoped lang="scss">
.layout {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #00000020;
  display: flex;
  align-items: center;
  justify-content: center;

  & .model {
    background-color: #fff;
    border: 1px solid #eee;
    border-radius: 12px;

    & .header {
      background-color: rgba(85, 184, 113, 0.301);
      height: 40px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
}
</style>