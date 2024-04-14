<template>
  <div class="page">
    <TheHeader />
    <main>
      <TheSideBar />
      <Tree
        :value="nodes2"
        @node-expand="onNodeExpand2"
        loadingMode="icon"
        class="w-full md:w-30rem"
      ></Tree>
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
      nodes2: null,
      loading: false
    }
  },

  mounted() {
    this.getCategories()
    this.nodes2 = this.initateNodes2()

    setTimeout(() => {
      this.loading = false
      this.nodes2.map((node) => (node.loading = false))
    }, 2000)
  },

  methods: {
    async getCategories() {
      try {
        const res = await getCategories()
        console.log(res)
      } catch (e) {
        console.error(e)
      }
    },
    onNodeExpand2(node) {
      if (!node.children) {
        node.loading = true

        setTimeout(() => {
          let _node = { ...node }

          _node.children = []

          for (let i = 0; i < 3; i++) {
            _node.children.push({
              key: node.key + '-' + i,
              label: 'Lazy ' + node.label + '-' + i
            })
          }

          let _nodes = { ...this.nodes2 }

          _nodes[parseInt(node.key, 10)] = { ..._node, loading: false }

          this.nodes2 = _nodes
        }, 500)
      }
    },
    initateNodes2() {
      return [
        {
          key: '0',
          label: 'Node 0',
          leaf: false,
          loading: true
        },
        {
          key: '1',
          label: 'Node 1',
          leaf: false,
          loading: true
        },
        {
          key: '2',
          label: 'Node 2',
          leaf: false,
          loading: true
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
iframe {
  width: 100%;
}
</style>
