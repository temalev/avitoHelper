
<template>
  <div class="page">
    <TheHeader />
    <main>
      <TheSideBar />
      <iframe :src="`https://chat.avigroup.site/#${hash}`" frameborder="0"></iframe>
    </main>
    </div>
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
iframe {
  width: 100%;
}
</style>
