
<template>
    <router-view :chatId="chatId" />
</template>
<script>

export default {
  props: {
    chatId: [String]
  },
  data() {
    return {

    }
  },
  mounted(){
  },

}
</script>
<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;
  background-color: inherit;
  width: 100%;
  min-height: 100vh;
}
iframe {
  width: 100%;
  height: 100%;
  background-color: inherit;

  & body {
    background-color: inherit;
  }
}
</style>
