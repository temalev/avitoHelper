
<template>
      <router-view :calcType="calcType"></router-view>
</template>
<script>

export default {
  props: {
    calcType: [String]
  },
  data() {
    return {
      hash: '',
    }
  },
  mounted(){
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
</style>
