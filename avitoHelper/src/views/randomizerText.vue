<template>
  <div class="page">
    <TheHeader />
    <main>
      <TheSideBar />
      <div class="body">
        <Card>
          <template #title>Рандомайзер текста</template>
          <template #content>
            <p>
              Для создания перестановок подстрок используйте конструкцию
              <b class="text-black">[text1|text2|…]</b>.
              <br />
              Для выбора одного из предложенных вариантов используйте конструкцию
              <b class="text-black">{text1|text2|...}</b>.
              <br />
              Для генерации случайного артикля, используйте конструкцию
              <b class="text-black">ARTICLE(00-aA000)</b>, где вместо
              <b class="text-black">0</b> подставятся случайные числа, а вместо
              <b class="text-black">а и А</b> – буквы выбранного регистра и языка
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
                    >Число всех возможных вариантов: <b class="text-black">{{ maxCount }}</b></span
                  >
                  <label for="minmax">Введите желаемое количество варинтов</label>
                  <InputNumber v-model="count" inputId="minmax" :min="0" :max="maxCount" style="width: 80px" />
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
          <template #footer>
            <textarea v-for="text, idx in list" :key="idx" :value="text" class="output" />
          </template>
        </Card>
      </div>
    </main>
  </div>
</template>
<script>
import { debounce } from '@/utils/debounce.js'

import TheHeader from '@/components/TheHeader.vue'
import TheSideBar from '@/components/TheSideBar.vue'
import { getRandomizerCount, createRandomText } from '@/api/randomizer'

export default {
  components: { TheSideBar, TheHeader },
  data() {
    return {
      content: 'test',
      maxCount: 0,
      count: 0,
      list: []
    }
  },

  watch: {
    content(val) {
      this.debouncedGetRandomizerCount()
    }
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
    async startRandomizer() {
      const data = {
        template: this.content || '',
        count: this.count,
      }
      try {
        const res = await createRandomText(data)
        this.list = res.texts
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
.body {
  margin: 20px;
  width: 100%;
}

.editor {
  border: 1px solid #eee;
  border-radius: 6px;

  &-header {
    padding: 12px;
    border-bottom: 1px solid #eee;
    display: flex;
    gap: 4px;

    & button {
      border: 1px solid #ececec;
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
    }
  }

  &-footer {
    padding: 12px;
    border-top: 1px solid #eee;
  }
}

.output {
 width: 100%;
 outline: none;
 border-radius: 6px;
 padding: 12px;
 height: 120px;
 border: 1px solid #eee;
}
</style>
