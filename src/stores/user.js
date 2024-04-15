import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const user = ref(5)
  // const doubleCount = computed(() => count.value * 2)
  function increment() {
    user
  }

  return { user, increment }
})
