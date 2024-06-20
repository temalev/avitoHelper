
<template>
    <router-view :chatId="chatId" :accountId="accountId" :updateMessages="updateMessages" />
</template>
<script>

export default {
  props: {
    chatId: [String],
    accountId: [String],
    updateMessages: [String],
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
