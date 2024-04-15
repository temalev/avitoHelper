<template>
  <div class="page">
    <TheHeader />
    <main>
      <TheSideBar />
      <div class="body">
        <Card>
          <template #title>Сборщик объявлений авито</template>
          <template #content>
            <label for="link">Ссылка</label>
            <InputText style="width: 100%" type="text" id="link" v-model="link" />
            <div class="d-flex-column mt-2">
              <label for="minmax">Введите желаемое количество страниц</label>
              <InputNumber v-model="count" inputId="minmax" :max="50" style="width: 80px" />
            </div>
          </template>
          <template #footer>
            <Button
              type="button"
              :loading="parserProcess"
              label="Запустить парсинг"
              style="flex-shrink: 0; width: fit-content"
              @click="startParser"
            />
          </template>
        </Card>

        <Card v-for="item in parserList" :key="item.id" class="mt-4">
          <template #title>{{ item.title || item.url }}</template>
          <template #content>
            <a v-if="item.fileUrl" :href="item.fileUrl">{{ item.fileUrl }}</a>
            <div>
              Количество страниц: {{ item.countPages }}
            </div>
          </template>
          <template #footer>
            <InlineMessage v-if="item.statusId === 1" severity="success">Завершено</InlineMessage>
            <InlineMessage v-if="item.statusId === 0" severity="info">В процессе</InlineMessage>
            <InlineMessage v-if="item.statusId === 2" severity="error"
              >Произошла ошибка</InlineMessage
            >
          </template>
        </Card>
      </div>
    </main>
  </div>
</template>
<script>
import { getAllParsers, startParser } from '@/api/parser'
import TheHeader from '../components/TheHeader.vue'
import TheSideBar from '../components/TheSideBar.vue'

export default {
  components: { TheHeader, TheSideBar },
  data() {
    return {
      count: 0,
      link: null,
      parserProcess: false,
      parserList: []
    }
  },

  mounted() {
    this.getAllParsers()
    this.intervalGetParsers()
  },

  methods: {
    intervalGetParsers() {
      setInterval(() => {
        this.getAllParsers()
      }, 30000);
    },
    async getAllParsers() {
      try {
        const res = await getAllParsers()
        this.parserList = res
      } catch (e) {
        console.error(e)
      }
    },
    async startParser() {
      this.parserProcess = true
      const data = {
        url: this.link || '',
        count: this.count
      }
      try {
        const res = await startParser(data)
        this.template = res
      } catch (e) {
        console.error(e)
      }
      this.parserProcess = false

        this.getAllParsers()

    }
  }
}
</script>

<style lang="scss" scoped>
.body {
  margin: 20px;
  width: 100%;
}

.p-inline-message {
  height: 36px;
}
</style>
