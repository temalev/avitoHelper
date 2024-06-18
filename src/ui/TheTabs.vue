<template>
  <div class="tabs">
    <div
      v-for="tab in data"
      :key="tab.id"
      class="tab"
      :class="{ active: activeTab === tab.id }"
      @click="activeTab = tab.id, $emit('activeTab', activeTab)"
    >
      {{ tab.label }}
    </div>
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
      activeTab: 1,
    }
  }
}
</script>
<style scoped lang="scss">
.tabs {
  display: flex;
  gap: 12px;
  background-color: transparent;
}

.tab {
  cursor: pointer;
  padding: 8px 12px;
  color: rgb(193, 193, 193);
  border: 1px solid transparent;
  &:hover {
    color: rgb(255, 255, 255);
  }
}

.active {
  background: var(--background-color);
  border-radius: 8px 8px 0 0;
  box-shadow: 0 -2px 15px 1px rgba(36, 43, 36, 0.19);
  backdrop-filter: blur(4.9px);
  -webkit-backdrop-filter: blur(4.9px);
  border: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
  color: rgb(255, 255, 255);
}
</style>
