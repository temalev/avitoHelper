
<template>
    <main>
      <router-view />
    </main>
</template>
<script>

export default {
  props: {
    calcType: [String]
  },
  data() {
    return {
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
