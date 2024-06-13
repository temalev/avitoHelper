
<template>
    <router-view :chatId="chatId" :accountId="accountId" />
</template>
<script>

export default {
  props: {
    chatId: [String],
    accountId: [String],
  },
  data() {
    return {

    }
  },
  mounted(){
  },

}
</script>
<style lang="scss" scoped>

</style>
