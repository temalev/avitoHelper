<template>
  <main>
   <span>ID: {{ store.user?.id }}</span>
  </main>
</template>
<script>
import { useUserStore } from '@/stores/user'

export default {
  data() {
    return {
      store: useUserStore(),
    }
  },

  mounted() {
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
