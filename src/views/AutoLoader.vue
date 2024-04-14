<template>
  <div class="page">
    <TheHeader />
    <main>
      <TheSideBar />
      <div class="card flex justify-content-center">
        <Tree :value="categoriesFiltered" class="w-full md:w-30rem">
          <template #default="slotProps">
            <b class="item">{{ slotProps.node.name }}</b>
          </template>
          <template #url="slotProps">
            <span class="lastChild hover:link" @click="getFields(slotProps.node.id)">{{ slotProps.node.name }}</span>
          </template>
        </Tree>
        а тут уже основная часть, где будет выводиться инфа по шаблонам
      </div>
    </main>
  </div>
</template>
<script>
import { getCategories, getFields } from '@/api/autoloader'
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
        if (obj.showFields) {
          obj.type = 'url'
        }
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
    async getFields(id) {
      try {
        const res = await getFields(id)
        console.log(e);
      } catch(e) {
        console.error(e)
      }
    },
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
main {
  min-height: 100vh;
}
iframe {
  width: 100%;
}
.item {
  cursor: pointer;
}
.lastChild {  
  cursor: pointer;
  &:hover {
    color: #000;
  }
}
</style>
