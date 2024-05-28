<template>
<div class="tabs">
  <div v-for="tab in data" :key="tab.id" class="tab" :class="{'active': activeTab === tab.id}" @click="activeTab = tab.id">{{ tab.label }}</div>
</div>
</template>
<script>
export default {
props: {
  data: {
    type: Array,
    default: () => []
  }
},
data() {
  return {
    activeTab: 0
  }
}
}
</script>
<style scoped>
.tabs {
  display: flex;
  gap: 12px;
  background-color: transparent;
}

.tab {
  cursor: pointer;
  padding: 8px 12px;
}

.active {
  border-bottom: 1px solid blue;
  color: blue
}
</style>