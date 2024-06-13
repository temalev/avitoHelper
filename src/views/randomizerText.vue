<template>
  <main>
    <Card>
      <template #title>Генератор текста</template>
      <template #content>
        <p>
          Для создания перестановок подстрок используйте конструкцию
          <b class="font-bold">[text1|text2|…]</b>.
          <br />
          Для выбора одного из предложенных вариантов используйте конструкцию
          <b class="font-bold">{text1|text2|...}</b>.
          <br />
          Для генерации случайного артикля, используйте конструкцию
          <b class="font-bold">ARTICLE(00-aA000)</b>, где вместо
          <b class="font-bold">0</b> подставятся случайные числа, а вместо
          <b class="font-bold">а и А</b> – буквы выбранного регистра и языка
        </p>
        <br />
        <div class="editor">
          <div class="editor-header">
            <button @click="insertAtCursor('|')">Вставить "|"</button>
            <button @click="insertAtCursor('||||')">Вставить "||||"</button>
            <button @click="insertAtCursor('{||||}')">Вставить "{a|b|c|d|}"</button>
            <button @click="insertAtCursor('[||||]')">Вставить "[a|b|c|d|]"</button>
            <button @click="insertAtCursor('[+, +||||]')">Вставить "[+, +a|b|c|d|]"</button>
          </div>
          <div class="editor-body">
            <textarea v-model="content" id="textarea" />
          </div>
          <div class="editor-footer">
            <div class="d-flex-column gap-2">
              <span
                >Число всех возможных вариантов: <b class="font-bold">{{ maxCount }}</b></span
              >
              <label for="minmax">Введите желаемое количество варинтов (максимум 1000000)</label>
              <InputNumber
                v-model="count"
                inputId="minmax"
                :min="0"
                :max="1000000"
                style="width: 80px"
              />
              <Button
                type="button"
                label="Рандомизировать"
                @click="startRandomizer"
                style="flex-shrink: 0; width: fit-content"
              />
            </div>
          </div>
        </div>
      </template>
      <template v-if="template?.texts?.length" #footer>
        <Panel header="Header" toggleable>
          <template #header>
            <div class="flex align-items-center pl-2 gap-4">
              <span class="font-bold" style="align-content: center"
                >Шаблон: {{ template?.templateId }}</span
              >
              <Button
                label="Скачать шаблон"
                style="height: 30px"
                @click="downloadTemplate(template?.templateId)"
              />
              <Button
                label="Удалить шаблон"
                severity="danger"
                style="height: 30px"
                @click="deleteTemplate(template?.templateId)"
              />
            </div>
          </template>
          <textarea
            v-for="(text, idx) in template?.texts"
            :key="idx"
            :value="text"
            class="output"
          />
        </Panel>
      </template>
    </Card>
    <Panel class="mt-4" header="История" toggleable>
      <Button
                label="Удалить все шаблоны"
                severity="danger"
                style="height: 30px"
                @click="deleteTemplates()"
              />
      <Card v-for="item in templates" :key="item.id" class="mt-4">
        <template #title>
          <div class="flex align-items-center pl-2 gap-4">
            <span class="font-bold" style="align-content: center">Шаблон: {{ item?.id }}</span>
            <Button
              label="Скачать шаблон"
              style="height: 30px"
              @click="downloadTemplate(item?.id)"
            />
            <Button
                label="Удалить шаблон"
                severity="danger"
                style="height: 30px"
                @click="deleteTemplate(item?.id)"
              />
          </div>
        </template>
        <template #content>
          <p :href="item.fileUrl">{{ item.template }}</p>
        </template>
      </Card>
    </Panel>
  </main>
</template>
<script>
import { debounce } from '@/utils/debounce.js'

import {
  getRandomizerCount,
  createRandomText,
  getAllRandomizer,
  downloadTemplate,
  deleteTemplate,
  deleteTemplates
} from '@/api/randomizer'

export default {
  data() {
    return {
      content: 'test',
      maxCount: 0,
      count: 0,
      list: [],
      templates: null
    }
  },

  watch: {
    content(val) {
      this.debouncedGetRandomizerCount()
    }
  },

  mounted() {
    this.getAllRandomizer()
  },

  methods: {
    debouncedGetRandomizerCount: debounce(function () {
      this.getRandomizerCount()
    }, 500),
    async getRandomizerCount() {
      const data = {
        template: this.content || ''
      }
      try {
        const res = await getRandomizerCount(data)
        this.maxCount = res.maxCount
      } catch (e) {
        console.error(e)
      }
    },
    async getAllRandomizer() {
      try {
        const res = await getAllRandomizer()
        this.templates = res
      } catch (e) {
        console.error(e)
      }
    },
    async deleteTemplate(templateId) {
      try {
        const res = await deleteTemplate(templateId)
        this.getAllRandomizer()
      } catch (e) {
        console.error(e)
      }
    },
    async deleteTemplates(templateId) {
      try {
        const res = await deleteTemplates()
        this.getAllRandomizer()
      } catch (e) {
        console.error(e)
      }
    },
    async downloadTemplate(templateId) {
      try {
        const res = await downloadTemplate(templateId, 'xlsx')
        var blob = new Blob([res], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        })
        var link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = 'template.xlsx'
        link.click()
      } catch (e) {
        console.error(e)
      }
    },
    async startRandomizer() {
      const data = {
        template: this.content || '',
        count: this.count
      }
      try {
        const res = await createRandomText(data)
        this.template = res
        this.getAllRandomizer()
      } catch (e) {
        console.error(e)
      }
    },
    async insertAtCursor(myValue) {
      const myField = document.querySelector('#textarea')
      if (myField.selectionStart || myField.selectionStart === 0) {
        var startPos = myField.selectionStart
        var endPos = myField.selectionEnd
        this.content =
          myField.value.substring(0, startPos) +
          myValue +
          myField.value.substring(endPos, myField.value.length)
        await this.$nextTick() // This sentence is the point, circled up
        myField.focus()
        myField.setSelectionRange(endPos + myValue.length, endPos + myValue.length)
      } else {
        this.content += myValue
      }
    },
    randomize() {}
  }
}
</script>
<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;
  background-color: inherit;
  overflow-y: auto;
}

.editor {
  border: 1px solid var( --border-color);
  border-radius: 6px;

  &-header {
    padding: 12px;
    border: 1px solid var( --border-color);
    display: flex;
    gap: 4px;

    & button {
      border: 1px solid var( --border-color);
      border-radius: 4px;
      cursor: pointer;
      height: 36px;
      width: fit-content;
      padding: 0 12px;
      background-color: #f4f4f4;

      &:hover {
        background-color: #eaeaea;
      }
    }
  }

  &-body {
    & textarea {
      padding: 12px;
      width: 100%;
      height: 300px;
      outline: none;
      border: none;
      background-color: #ffffffe1;

    }
  }

  &-footer {
    padding: 12px;
    border: 1px solid var( --border-color);
  }
}

.output {
  width: 100%;
  outline: none;
  border-radius: 6px;
  padding: 12px;
  height: 120px;
  border: 1px solid var( --border-color);
}
</style>
