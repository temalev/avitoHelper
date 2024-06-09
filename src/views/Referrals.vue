
<template>
    <main>
      Рефералы
    </main>
</template>
<script>


export default {
  data() {
    return {
      hash: '',
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
  height: 100%;
  overflow: auto;
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
