<template>
  <div class="page">
    <TheHeader />
    <main>
      <TheSideBar />
      <div class="body flex justify-content-center">
        <div class="d-flex-column align-flex-start">
          <Tree :value="categoriesFiltered" class="w-full md:w-20rem">
            <template #default="slotProps">
              <b class="item">{{ slotProps.node.name }}</b>
            </template>
            <template #url="slotProps">
              <span class="lastChild hover:link" @click="getFields(slotProps.node.id)">{{
                slotProps.node.name
              }}</span>
            </template>
          </Tree>
          <div class="m-0-6 d-flex-column">
            <label for="integeronly" class="font-bold block mb-2"> Количество </label>
            <InputNumber v-model="count" inputId="integeronly" />
            <Button @click="createFile" style="height: 32px" class="mt-5"
              >Сгенерировать файл</Button
            >
          </div>
        </div>
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
              <Textarea
                v-if="field.type === 'input' && field.tag !== 'ImageUrls'"
                type="text"
                style="width: 500px"
                v-model="field.inputValue"
                placeholder="Введите значение..."
                rows="5"
                cols="30"
              />
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
              <Dropdown
                v-if="field.type === 'select'"
                v-model="field.inputValue"
                editable
                :options="field.data.values"
                optionLabel="value"
                placeholder="Одно из значений"
              />
              <Button v-if="field.tag === 'ImageUrls'" @click="openFileDialog">Загрузить</Button>
              <input
                v-if="field.tag === 'ImageUrls'"
                hidden
                ref="fileInput"
                type="file"
                id="avatar"
                name="avatar"
                accept="image/png, image/jpeg"
                @change="onSelectFile"
              />
            </div>
          </Panel>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import { getCategories, getFields, createFile } from '@/api/autoloader'
import { uploadFile } from '@/api/image'
import TheHeader from '../components/TheHeader.vue'
import TheSideBar from '../components/TheSideBar.vue'
import { v4 as uuidv4 } from 'uuid'

export default {
  components: { TheHeader, TheSideBar },

  data() {
    return {
      count: 1,
      categories: null,
      loading: false,
      fields: [],
      accept: '.jpg, .png',
      uuid: null,
      categoryId: null
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
      return roots
    }
  },

  methods: {
    async createFile() {
      const fields = []
      this.fields.forEach((el) => {
        if (el.tag === 'ImageUrls') {
          fields.push({
            fieldId: el.id,
            value: this.uuid
          })
          return
        }
        if (!el.inputValue) return

        fields.push({
          fieldId: el.id,
          value: el.inputValue
        })
      })
      try {
        const res = await createFile({ fields, count: this.count, categoryId: this.categoryId })
        var blob = new Blob([res], { type: res.type })
        var link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = 'template.xlsx'
        link.click()
      } catch (e) {
        console.error(e)
      }
    },
    openFileDialog() {
      this.$refs.fileInput[0].click()
    },
    async onSelectFile(e) {
      const files = e.target.files
      const params = {
        albumUuid: this.uuid,
      }
      try {
        const file = await uploadFile(files[0], params)
      } catch (e) {
        console.error(e)
      }
    },
    async getFields(id) {
      this.categoryId = id
      try {
        const res = await getFields(id)
        res.forEach((el) => {
          this.fields.push({ ...el, inputValue: null })
        })
        this.uuid = uuidv4()
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
  overflow: hidden;
}
.body {
  box-sizing: border-box;
}

.fields {
  overflow: auto;
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

::v-deep {
  .p-tree-wrapper {
    width: inherit;
  }
}
</style>
