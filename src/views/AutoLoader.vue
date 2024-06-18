<template>
  <main>
    <div class="body flex justify-content-center">
      <div class="tree d-flex-column align-flex-start gap-4">
        <Tree :value="categoriesFiltered" class="w-full md:w-20rem" style="box-sizing: content-box">
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
          <label for="integeronly" style="color: #fff" class="font-bold block mb-2">
            Количество (максимум 10000)
          </label>
          <InputNumber v-model="count" inputId="integeronly" :max="10000" />
          <Button
            type="button"
            @click="createFile"
            label="Сгенерировать файл"
            :loading="generateFileProcess"
            style="height: 32px"
            class="mt-5"
          ></Button>
          <Button
            type="button"
            @click="showUploadAutoloadFileModal = true"
            label="Загрузка файла автозагрузки на Авито"
            style="height: 52px"
            class="mt-5"
          ></Button>
        </div>
      </div>
      <div v-loading="loadingFields" class="fields d-flex-column gap-4 w-full">
        <Panel v-for="field in fields" :key="field.id" toggleable>
          <template #header>
            <div>
              {{ field.label }}
              <span class="ml-4 text-orange-400 text-xs" v-if="field.required">Обязательный</span>
            </div>
          </template>
          <p class="text-sm description" style="overflow-wrap: anywhere">
            <Markdown :source="field.description" />
          </p>
          <div class="d-flex-column mt-4 p-2 rounded-md example-card">
            <b style="color: #eee">Пример заполнения</b>
            <p><Markdown :source="field.example" /></p>
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

            <template v-else-if="field.type === 'checkbox'">
              <div
                v-for="item in field.data.values"
                :key="item.value"
                class="checkbox flex align-center gap-2"
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
              v-else-if="field.type === 'select'"
              v-model="field.inputValue"
              editable
              :options="field.data.values"
              optionValue="value"
              optionLabel="value"
              placeholder="Одно из значений"
            />
            <div class="d-flex-column gap-4" v-else-if="field.tag === 'ImageUrls'">
              <div class="d-flex-column gap-2 photos-container">
                <span>Основное фото</span>
                <Button
                  style="width: 140px"
                  @click="openFileDialog"
                  :loading="uploadingProcess"
                  label="Загрузить"
                ></Button>
                <input
                  hidden
                  ref="fileInput"
                  type="file"
                  id="avatar"
                  name="avatar"
                  multiple
                  accept="image/png, image/jpeg"
                  @change="onSelectFile"
                />

                <div v-if="urlFiles.length" class="d-flex gap-4 photos" style="overflow: auto">
                  <div
                    v-for="urlFile in urlFiles"
                    :key="urlFile"
                    class="image-container"
                  >
                    <img
                      :src="urlFile"
                      alt=""
                      width="100"
                      height="100"
                      style="flex-shrink: 0; box-sizing: border-box; border-radius: 12px"
                    />
                    <div class="btn-delete">
                      <i class="pi pi-times"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div class="d-flex-column gap-2 photos-container">
                <span>Дополнительные фото</span>
                <Message v-if="!urlFiles.length" :closable="false"
                  >Для начала загрузите основное фото</Message
                >
                <Button
                  :disabled="!urlFiles.length"
                  style="width: 140px"
                  @click="openFileDialogAdditional"
                  :loading="uploadingAdditionalProcess"
                  label="Загрузить"
                ></Button>
                <input
                  hidden
                  ref="fileInputAdditional"
                  type="file"
                  id="avatar"
                  name="avatar"
                  multiple
                  accept="image/png, image/jpeg"
                  @change="onSelectFileAdditional"
                />
                <div
                  v-if="urlFilesAdditional.length"
                  class="d-flex gap-4 photos"
                  style="overflow: auto"
                >
                  <img
                    v-for="urlFile in urlFilesAdditional"
                    :key="urlFile"
                    :src="urlFile"
                    alt=""
                    width="100"
                    height="100"
                    style="flex-shrink: 0; box-sizing: border-box; border-radius: 12px"
                  />
                </div>
              </div>
              <div class="checkbox d-flex align-center">
                <Checkbox
                  v-model="field.shouldSkipRandomize"
                  name="shouldSkipRandomize"
                  inputId="shouldSkipRandomize"
                  :binary="true"
                />
                <label class="ml-2" for="shouldSkipRandomize">Не рандомизировать фото</label>
              </div>
            </div>
            <Textarea
              v-else-if="!field.type || field.type !== 'input'"
              type="text"
              style="width: 500px"
              v-model="field.inputValue"
              placeholder="Введите значение..."
              rows="5"
              cols="30"
            />
            <div v-if="field.tag === 'DateBegin'" class="checkbox d-flex align-center">
              <Checkbox
                v-model="field.shouldSkipNight"
                name="shouldSkipNight"
                inputId="shouldSkipNight"
                :binary="true"
              />
              <label class="ml-2" for="shouldSkipNight">Пропускать ночное время</label>
            </div>
          </div>
          <template v-if="field.tag !== 'ImageUrls'" #footer>
            <Button
              style="width: 180px"
              @click="openFieldFileDialog"
              :loading="uploadFieldFileProcess"
              label="Загрузить файлом"
            ></Button>
            <input
              hidden
              ref="fieldFileInput"
              type="file"
              id="avatar"
              name="avatar"
              accept=".txt,text/plain,.csv,text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
              @change="(e) => uploadFieldFile(e, field)"
            />
            <InlineMessage v-if="field?.uuidFieldFile" severity="success"
              >Success Message</InlineMessage
            >
          </template>
        </Panel>
      </div>
    </div>
    <upload-autoload-file-modal
      v-if="showUploadAutoloadFileModal"
      @close="showUploadAutoloadFileModal = false"
    />
  </main>
</template>
<script>
import { getCategories, getFields, createFile, uploadFieldFile } from '@/api/autoloader'
import { uploadFile } from '@/api/image'

import { v4 as uuidv4 } from 'uuid'
import UploadAutoloadFileModal from '@/components/UploadAutoloadFileModal.vue'

export default {
  components: { UploadAutoloadFileModal },
  data() {
    return {
      count: 1,
      categories: null,
      loading: false,
      fields: [],
      accept: '.jpg, .png',
      uuid: null,
      categoryId: null,
      generateFileProcess: false,
      uploadingProcess: false,
      urlFiles: [],
      urlFilesAdditional: [],
      uploadFieldFileProcess: false,
      loadingFields: false,
      showUploadAutoloadFileModal: false
    }
  },

  mounted() {
    this.getCategories()
  },
  watch: {
    'field.shouldSkipNight'(val) {
      console.log(val)
    }
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
      this.generateFileProcess = true
      const fields = []
      this.fields.forEach((el) => {
        if (el.tag === 'ImageUrls' && this.uuid) {
          fields.push({
            fieldId: el.id,
            value: this.uuid
          })
          return
        }
        if (!el.inputValue && !el.uuidFieldFile) return

        fields.push({
          fieldId: el.id,
          value: el.uuidFieldFile
            ? `file:${el.uuidFieldFile}`
            : Array.isArray(el.inputValue)
              ? el.inputValue.join('|')
              : el.inputValue,
          shouldSkipNight: el.shouldSkipNight,
          shouldSkipRandomize: el.shouldSkipRandomize
        })
      })
      try {
        const res = await createFile({ fields, count: this.count, categoryId: this.categoryId })
        // var blob = new Blob([res], { type: res.type })
        // var link = document.createElement('a')
        // link.href = window.URL.createObjectURL(blob)
        // link.download = 'template.xlsx'
        // link.click()
        window.open(res.url, '_blank')
      } catch (e) {
        console.error(e)
      }
      this.generateFileProcess = false
    },
    openFileDialog() {
      this.$refs.fileInput[0].click()
    },
    openFileDialogAdditional() {
      this.$refs.fileInputAdditional[0].click()
    },
    openFieldFileDialog() {
      this.$refs.fieldFileInput[0].click()
    },
    async onSelectFile(e) {
      this.uuid = uuidv4()
      Array.from(e.target.files).forEach((file) => {
        this.onUploadFile(file)
      })
    },
    async onUploadFile(file) {
      this.uploadingProcess = true
      const params = {
        albumUuid: this.uuid,
        type: 'basic'
      }
      try {
        await uploadFile(file, params)
        this.urlFiles.push(URL.createObjectURL(file))
      } catch (e) {
        console.error(e)
      }
      this.uploadingProcess = false
    },
    async onSelectFileAdditional(e) {
      Array.from(e.target.files).forEach((file) => {
        this.uploadFileAdditional(file)
      })
    },
    async uploadFileAdditional(file) {
      this.uploadingAdditionalProcess = true

      const params = {
        albumUuid: this.uuid,
        type: 'additional'
      }
      try {
        const res = await uploadFile(file, params)
        this.urlFilesAdditional.push(URL.createObjectURL(file))
      } catch (e) {
        console.error(e)
      }
      this.uploadingAdditionalProcess = false
    },
    async uploadFieldFile(e, field) {
      this.uploadFieldFileProcess = true
      const file = e.target.files
      try {
        const res = await uploadFieldFile(file[0])
        field.uuidFieldFile = res.fileName
      } catch (e) {
        console.error(e)
      }
      this.uploadFieldFileProcess = false
    },
    async getFields(id) {
      this.loadingFields = true
      this.categoryId = id
      this.fields = []
      try {
        const res = await getFields(id)
        res.forEach((el) => {
          this.fields.push({
            ...el,
            inputValue: null,
            shouldSkipNight: false,
            shouldSkipRandomize: false,
            uuidFieldFile: null
          })
        })
      } catch (e) {
        console.error(e)
      }
      this.loadingFields = false
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
.example-card {
  background-color: #2425257d;
}
main {
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: inherit;
  overflow: hidden;
}
.body {
  margin: 20px;
  display: flex;
  gap: 18px;
  align-content: flex-start;
}

.tree {
  // overflow: auto;
  height: calc(100vh - 150px);
  width: 460px;
}

::v-deep {
  .p-tree {
    overflow: auto;
    height: calc(100vh - 150px);
  }
}

.fields {
  overflow: auto;
  height: calc(100vh - 100px);
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

img {
  object-fit: contain;
  box-shadow: 0 0 10px 5px #111;
  border: 1px solid var(--border-color);
  border-radius: 8px;
}

.photos-container {
  background-color: #eeeeeea1;
  padding: 12px;
  border-radius: 8px;
}

.photos-container {
  background: var(--background-color);
  border-radius: 8px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4.9px);
  -webkit-backdrop-filter: blur(4.9px);
  border: 1px solid var(--border-color);
  color: #eee;
}

.photos {
  padding: 12px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
}

.image-container {
  position: relative;
}

.btn-delete {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: absolute;
  top: 0;
  right: 0;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 1px solid #333;
  background-color: #242424;
  transition: .2s;
  cursor: pointer;

  &:hover {
    border: 1px solid #4e4e4e;
    background-color: #171717;
  }
}

::v-deep {
  .p-tree-wrapper {
    width: inherit;
  }
}
</style>
