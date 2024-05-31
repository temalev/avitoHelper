<script>
import { RouterLink, RouterView } from 'vue-router'
import { getMe } from '@/api/login'
import { useUserStore } from '@/stores/user'
import TheHeader from '@/components/TheHeader.vue'
import TheSideBar from '@/components/TheSideBar.vue'

export default {
  components: {
    TheHeader, TheSideBar
  },
  data(){
    return {
      store: useUserStore()
    }
  },
mounted() {
  this.getMe()
},
methods: {
    async getMe() {
      try {
        const res = await getMe()
        this.store.user = res
      } catch(e) {
        console.error(e)
        if (this.$route.path !== '/confirm/email') {
          this.$router.push({name: 'login'})
        }
      }
    },
  }
}
</script>

<template>
      <TheSideBar />
      <div class="page d-flex-column w-full">
        <TheHeader />
    <RouterView />
      </div>
</template>

<style scoped scss>
.page {
  background-color: #F3F4F7;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  /* width: 100%; */
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

</style>
