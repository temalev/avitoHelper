<template>
  <main>
    <!-- <img src="/public/img/chart.png" alt="" width="80%"> -->
    <h3 class="m-4">График просмотры/избранное/звонки по всем аккаунтам и объявлениям</h3>
    <line-chart :data="data" download="boom" />
    <h3 class="m-4">Звонки</h3>
    <line-chart :data="data" download="boom" />
    <h3 class="m-4">Сообщения</h3>
    <line-chart :data="data" download="boom" />
    <h3 class="m-4">Баланс</h3>
    <line-chart :data="data" download="boom" />
  </main>
</template>
<script>
export default {
  data() {
    return {
      data: [
        {
          name: 'Workout',
          data: {
            '2022-01-01 00:00:00 -0800': 3,
            '2022-05-02 00:00:00 -0800': 4,
            '2023-02-02 00:00:00 -0800': 5,
            '2024-02-02 00:00:00 -0800': 2
          }
        },
        {
          name: 'Call parents',
          data: {
            '2022-01-01 00:00:00 -0800': 1,
            '2022-05-02 00:00:00 -0800': 2,
            '2023-02-02 00:00:00 -0800': 3,
            '2024-02-02 00:00:00 -0800': 10
          }
        },
        {
          name: 'Call parents',
          data: {
            '2022-01-01 00:00:00 -0800': 22,
            '2022-05-02 00:00:00 -0800': 10,
            '2023-02-02 00:00:00 -0800': 23,
            '2024-02-02 00:00:00 -0800': 18
          }
        }
      ]
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
</style>
