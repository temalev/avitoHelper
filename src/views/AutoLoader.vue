<template>
  <div class="page">
    <TheHeader />
    <main>
      <TheSideBar />
      <div class="body flex justify-content-center">
        <Tree :value="categoriesFiltered" class="w-full md:w-30rem">
          <template #default="slotProps">
            <b class="item">{{ slotProps.node.name }}</b>
          </template>
          <template #url="slotProps">
            <span class="lastChild hover:link" @click="getFields(slotProps.node.id)">{{
              slotProps.node.name
            }}</span>
          </template>
        </Tree>
        <div class="fields d-flex-column gap-4">
          <Panel v-for="field in fields" :key="field.id" toggleable>
            <template #header>
              <div>
                {{ field.tag }}
                <span class="ml-4 text-orange-400 text-xs" v-if="field.required">Обязательный</span>
              </div>
            </template>
            <p class="text-sm description" style="overflow-wrap: anywhere">
              {{ field.description }}
            </p>
            <div class="d-flex-column mt-4 bg-[#eee9] p-2 rounded-md">
              <b>Пример заполнения</b>
              <p>{{ field.example }}</p>
            </div>
            <div class="mt-4">
            <InputText v-if="field.type === 'input'" type="text" v-model="field.inputValue" placeholder="Введите значение..." />
            <template v-if="field.type === 'checkbox'">
              <div
                v-for="item in field.data.values"
                :key="item.value"
                class="flex align-items-center gap-2"
              >
                <Checkbox
                  v-model="field.inputValue"
                  :inputId="item.value"
                  name="category"
                  :value="item.value"
                />
                <label :for="item.value">{{ item.value }}</label>
              </div>
            </template>
            <Dropdown v-if="field.type === 'select'" v-model="field.inputValue" :options="field.data.values" optionLabel="value" placeholder="Одно из значений" />
          </div>
          </Panel>
        </div>
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
      loading: false,
      fields: []
    }
  },

  mounted() {
    this.getCategories()
  },

  computed: {
    categoriesFiltered() {
      const map = {}
      const roots = []

      this.categories?.forEach((obj) => {
        obj.key = `${obj.parentId}-${obj.id}`
        obj.inputValue = null
        if (obj.showFields) {
          obj.type = 'url'
        }
        const parentId = obj.parentId
        if (!map[parentId]) map[parentId] = []
        if (!map[obj.id]) map[obj.id] = []

        map[parentId].push(obj)

        if (map[obj.id]) obj.children = map[obj.id]
        else obj.children = []

        if (obj.parentId === 0) roots.push(obj)
      })
      console.log(roots)
      return roots
    }
  },

  methods: {
    async getFields(id) {
      try {
        const res = await getFields(id)
        this.fields = res
      } catch (e) {
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
  height: 100%;
}
.body {
  overflow: hidden;
  box-sizing: border-box;
}

.fields {
  padding: 20px;
  box-sizing: border-box;
  flex-grow: 0;
}
.description {
  text-overflow: unset;
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
