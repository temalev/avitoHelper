<template>
  <main>
    <span>Реферальная ссылка (клик чтобы скопировать):</span>
    <div class="d-flex-column mt-2">
      <Transition name="slide-up">
        <Button
          v-if="!isWritedText"
          :label="`p.avigroup.site/k?r=${store.user?.id}`"
          class="w-80"
          @click="writeClipboardText"
        />
        <InlineMessage v-else class="w-80" severity="success">Ссылка скопирована</InlineMessage>
      </Transition>
    </div>
    <div class="d-flex-column mt-4">
      <Card v-for="referral in referrals" :key="referral.Name">
        <template #title>{{ referral?.Name }}</template>
        <template #content>
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
        await navigator.clipboard.writeText(`p.avigroup.site/k?r=${this.store.user?.id}`)
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
