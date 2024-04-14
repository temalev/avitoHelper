<template>
  <div class="page">
    <TheHeader />
    <main>
      <TheSideBar />
      <div class="card flex justify-content-center">
        <Tree :value="categoriesFiltered" class="w-full md:w-30rem">
          <template #default="slotProps">
            <b>{{ slotProps.node.name }}</b>
          </template>
          <template #url="slotProps">
            <a :href="slotProps.node.name" target="_blank" rel="noopener noreferrer" class="text-700 hover:text-primary">{{ slotProps.node.name }}</a>
          </template>
        </Tree>
      </div>
    </main>
  </div>
</template>
<script>
import { getCategories } from '@/api/autoloader'
import TheHeader from '../components/TheHeader.vue'
import TheSideBar from '../components/TheSideBar.vue'

export default {
  components: { TheHeader, TheSideBar },

  data() {
    return {
      categories: null,
      loading: false
    }
  },

  mounted() {
    this.getCategories()
  },

  computed: {
    categoriesFiltered() {
      const map = {};
    const roots = [];
    
    this.categories?.forEach(obj => {
        obj.key = `${obj.parentId}-${obj.id}`
        const parentId = obj.parentId;
        if (!map[parentId]) map[parentId] = [];
        if (!map[obj.id]) map[obj.id] = [];
        
        map[parentId].push(obj);
        
        if (map[obj.id])
            obj.children = map[obj.id];
        else
            obj.children = [];

        if (obj.parentId === 0)
            roots.push(obj);
    });
    console.log(roots);
    return roots;
  }
  },

  methods: {
    async getCategories() {
      try {
        const res = await getCategories()
        this.categories = res
      } catch (e) {
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
