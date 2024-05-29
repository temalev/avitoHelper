<template>
  <main>
    <div class="body h-full">
      <Card>
        <template #title>Создание автоответа</template>
        <template #content>
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
              <div class="d-flex gap-12 align-flex-start">
                <div class="d-flex-column gap-2">
                  <label for="minmax" class="mb-2">Аккаунт, к которому будет применен шаблон</label>
                  <Dropdown
                    v-model="selectedAccount"
                    :options="accounts"
                    optionLabel="name"
                    optionValue="id"
                    placeholder="Выберите аккаунт"
                    class="w-full md:w-14rem"
                  />
                </div>
                <div class="d-flex-column gap-2">
                  <label for="minmax" class="mb-2">Частота повторений шаблонов</label>
                  <Slider v-model="count" class="w-14rem" />
                </div>
              </div>
              <Button
                class="mt-8"
                type="button"
                label="Создать автоответ"
                @click="createAutoReply"
                style="flex-shrink: 0; width: fit-content"
              />
            </div>
          </div>
        </template>
      </Card>

      <Card v-for="item in list" :key="item.id" class="mt-4 w-full">
        <template #title>{{ item.name }}</template>
        <template #content> {{ item.value }} </template>
        <template #footer> </template>
      </Card>
    </div>
  </main>
</template>
<script>
import { getAutoReplies, createAutoReply } from '@/api/autoReplies'
import { getAccounts } from '@/api/avitoAccount'
export default {
  data() {
    return {
      list: [],
      content: null,
      count: 0,
      selectedAccount: 1,
      accounts: []
    }
  },
  mounted() {
    this.getAutoReplies()
    this.getAccounts()
  },
  methods: {
    async getAutoReplies() {
      try {
        const res = await getAutoReplies()
        this.list = res.scenarios
      } catch (e) {
        console.error(e)
      }
    },
    async createAutoReply() {
      const data = {
        name: '',
        accountId: this.selectedAccount,
        randomWeight: this.count,
        value: this.content
      }
      try {
        const res = await createAutoReply(data)
        this.getAutoReplies()
      }
      catch(e) {
        console.error(e);
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
    async getAccounts() {
      try {
        const res = await getAccounts()
        this.accounts = res.accounts
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;
  background-color: inherit;
  width: 100%;
  min-height: 100vh;
  overflow: auto;
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
      height: 120px;
      outline: none;
      border: none;
    }
  }

  &-footer {
    padding: 12px;
    border-top: 1px solid #eee;
  }
}

::v-deep {
  .p-slider-handle {
    top: -8px;
  }
}
</style>
