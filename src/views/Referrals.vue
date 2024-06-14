<template>
  <main>
    <span class="text-white mt-20 text-center">Получайте 5% от сумм пополнений, совершённых пользователями,<br>которых вы пригласили, используя эту уникальную ссылку:</span>
    <div v-if="store.user?.uuid" class="d-flex mt-7 w-100% justify-center items-center gap-10">
      <div class="text-white">{{`https://p.avigroup.site/k?r=${store.user?.uuid}`}}</div>
      <Button
          :label="!isWritedText ? 'Copy' : 'Copied'"
          class="w-30"
          @click="writeClipboardText"
      />
    </div>
    <div v-if="referrals.length" class="d-flex-column mt-20">
      <Card>
        <template #title>Приведенные пользователи</template>
        <template #content>
          <div v-for="referral in referrals" :key="referral.id">
            {{ referrals.indexOf(referral) || 0 + 1 }}. {{ referral?.name }}
          </div>
          <p class="m-0"></p>
        </template>
      </Card>
    </div>
  </main>
</template>
<script>
import { useUserStore } from '@/stores/user'
import { getReferrals } from '@/api/referrals'

export default {
  data() {
    return {
      store: useUserStore(),
      isWritedText: false,
      referrals: []
    }
  },
  mounted() {
    this.getReferrals()
  },
  methods: {
    async writeClipboardText() {
      try {
        await navigator.clipboard.writeText(`https://p.avigroup.site/k?r=${this.store.user?.uuid}`)
        this.isWritedText = true
        setTimeout(() => {
          this.isWritedText = false
        }, 2000)
      } catch (error) {
        console.error(error.message)
      }
    },
    async getReferrals() {
      try {
        const res = await getReferrals()
        this.referrals = res
      } catch (e) {
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

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
