
<template>
    <main>
    <span>Реферальная ссылка:</span> <a :href="`/p.avigroup.site/k?r=${store.user?.id}`" target="blank">p.avigroup.site/k?r={{store.user?.id}}</a>
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
