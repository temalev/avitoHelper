
<template>
    <main>
      <iframe id="myIFrame" :src="`https://chat.avigroup.site/#${hash}`" frameborder="0"></iframe>
    </main>
</template>
<script>
import {getHash} from '@/api/gpt'

import TheHeader from '../components/TheHeader.vue'
import TheSideBar from '../components/TheSideBar.vue'
export default {
  components: {TheHeader, TheSideBar},
  data() {
    return {
      hash: '',
    }
  },
  mounted(){
  this.getHash()
  setTimeout(() => {
    console.log(document.getElementById('myIFrame').contentWindow.document);
  }, 3000)
  },
  methods: {
    async getHash() {
      try {
        const res = await getHash()
        this.hash = res.hash
      }
      catch(e) {
        console.error(e)
      }
    }
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
