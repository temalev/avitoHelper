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
              <InputNumber
                v-model="count"
                inputId="minmax"
                :max="50"
                style="width: 80px"
              />
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
          <template #title>{{item.title}}</template>
          <template #content>
            <a :href="item.fileUrl">{{ item.fileUrl }}</a>
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
      parserList: [],
    }
  },

  mounted() {
    this.getAllParsers()
  },

  methods: {
    async getAllParsers() {
      try {
        const res = await getAllParsers()
        this.parserList = res
      } catch (e) {
        console.error(e)
      }
    },
    async startParser() {
      this.parserProcess = true;
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
      this.parserProcess = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.body {
  margin: 20px;
  width: 100%;
}
</style>
