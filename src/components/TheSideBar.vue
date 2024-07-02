<template>
  <div class="side-bar">
    <div class="menu">
      <div class="d-flex-column">
        <div class="logo pointer mb-2" @click="$router.push({ name: 'home' })"></div>
        <router-link
          v-for="link in menuItems"
          :key="link"
          class="menu-item d-flex gap-2"
          :class="{ active: link.value === $route.name }"
          :to="{ name: link.value }"
        >
          {{ link.name }}
        </router-link>
      </div>

      <div class="d-flex gap-4 m-5">
        <a class="m-0" href="https://t.me/avi_group" target="_blanck"
          ><i class="pi pi-telegram" style="font-size: 1.5rem; color: #eee"></i
        ></a>
        <a class="m-0" href="https://www.youtube.com/@avigroup_service" target="_blanck"
          ><i class="pi pi-youtube" style="font-size: 1.5rem; color: #eee"></i
        ></a>
      </div>
    </div>
    <div class="menu-mobile">
      <div :class="isToLeft ? 'menu-mobile-active' : 'menu-mobile-hidden'">
        <div class="d-flex-column">
          <div class="logo pointer mb-2" @click="$router.push({ name: 'home' })"></div>
          <router-link
            v-for="link in menuItems"
            :key="link"
            class="menu-item d-flex gap-2"
            :class="{ active: link.value === $route.name }"
            :to="{ name: link.value }"
          >
            {{ link.name }}
          </router-link>
        </div>

        <div class="d-flex gap-4 m-5">
          <a class="m-0" href="https://t.me/avi_group" target="_blanck"
            ><i class="pi pi-telegram" style="font-size: 1.5rem; color: #eee"></i
          ></a>
          <a class="m-0" href="https://www.youtube.com/@avigroup_service" target="_blanck"
            ><i class="pi pi-youtube" style="font-size: 1.5rem; color: #eee"></i
          ></a>
        </div>
      </div>
      <div class="wrapper" style="justify-content: space-between; align-items: center">
        <div
          class="btnMenu"
          :class="isToLeft ? 'active' : ''"
          @click="(isToLeft = !isToLeft), onMenu()"
        >
          <span></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TheSideBar',
  data() {
    return {
      menuItems: [
        {
          id: 1,
          name: 'Чат-GPT',
          value: 'chatGpt'
        },
        {
          id: 2,
          name: 'Генератор текста',
          value: 'randomizerText'
        },
        // {
        //   id: 3,
        //   name: 'Рандомайзер изображений',
        //   value: 'randomizeImage'
        // },
        {
          id: 4,
          name: 'Создать таблицу',
          value: 'autoloader'
        },
        {
          id: 5,
          name: 'Парсер',
          value: 'parser'
        },
        {
          id: 6,
          name: 'Центр сообщений',
          value: 'chatsList'
        },
        {
          id: 7,
          name: 'Автоответчик',
          value: 'autoReplies'
        },
        {
          id: 8,
          name: 'Калькуляторы',
          value: 'calculators'
        },
        {
          id: 9,
          name: 'Статистика',
          value: 'stats'
        },
        {
          id: 10,
          name: 'История транзакций',
          value: 'history'
        },
        {
          id: 11,
          name: 'Аккаунты',
          value: 'accounts'
        },
        // {
        //   id: 12,
        //   name: 'Реферальная система',
        //   value: 'referrals'
        // },
        {
          id: 13,
          name: 'Настройки',
          value: 'settings'
        }
      ],
      isToLeft: false,
      isMenu: false
    }
  },
  methods: {
    onMenu() {
      if (!this.isToLeft) {
        this.isToLeft = false
        setTimeout(() => {
          this.isMenu = false
        }, 200)
      } else {
        this.isToLeft = true
        this.isMenu = true
      }
    }
  }
}
</script>
<style scoped lang="scss">
.side-bar {
  display: flex;
}
.menu {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #2425253f;
  width: 300px;
  flex-shrink: 0;
  color: #f3f3f3;
  padding-top: 12px;
  border-radius: 8px;

  & .logo {
    padding: 0 20px;
    font-size: 22px;
    color: var(--vt-c-white);
    background-image: url('@/assets/img/logo.svg');
    background-position: left;
    background-repeat: no-repeat;
    background-size: contain;
    width: 200px;
    height: 50px;
    margin-left: 20px;
  }

  & a {
    color: #d6d6d6;
    margin: 2px 20px;
    border-radius: 8px;
  }

  & .active {
    color: #d6d6d6;
    background-color: #0d1810d6;
    &:hover {
      color: #d6d6d6;
      background-color: #0d18106f;
    }
  }

  &-item {
    padding: 8px 20px;
    cursor: pointer;

    &:hover {
      color: #fff;
      background-color: #0d18106f;
    }
  }
}

.menu-mobile {
  display: none;
  flex-direction: row;
  width: 100%;

  & .logo {
    padding: 0 20px;
    font-size: 22px;
    color: var(--vt-c-white);
    background-image: url('@/assets/img/logo.svg');
    background-position: left;
    background-repeat: no-repeat;
    background-size: contain;
    width: 200px;
    height: 50px;
    margin-left: 20px;
  }

  & a {
    color: #d6d6d6;
    margin: 2px 20px;
    border-radius: 8px;
  }

  & .active {
    color: #d6d6d6;
    background-color: #0d1810d6;
    &:hover {
      color: #d6d6d6;
      background-color: #0d18106f;
    }
  }

  &-item {
    padding: 8px 20px;
    cursor: pointer;

    &:hover {
      color: #fff;
      background-color: #0d18106f;
    }
  }

  &-active {
    display: flex;
    flex-direction: column;
    width: calc(100vw - 80px);
  }

  &-hidden {
    display: none;
  }
}

.btnMenu {
  display: flex;
  position: relative;
  z-index: 50;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  background-color: var(--background-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  box-sizing: border-box;
  & span {
    height: 2px;
    width: 20px;
    transform: scale(1);
    background-color: #eee;
    border-radius: 10px;
  }
  &::before,
  &::after {
    content: '';
    position: absolute;
    height: 2px;
    width: 20px;
    background-color: #eee;
    transition: all 0.3s ease 0s;
    border-radius: 10px;
  }

  &::before {
    top: 14px;
  }

  &::after {
    bottom: 14px;
  }

  &.active span {
    transform: scale(0);
  }

  &.active::before {
    width: 15px;
    top: 50%;
    transform: rotate(-45deg) translate(0, 0%);
  }

  &.active::after {
    width: 15px;
    top: 50%;
    transform: rotate(45deg) translate(0, 0%);
  }
}

@media (max-width: 1100px) {
  .menu {
    display: none;
  }
  .menu-mobile {
    display: flex;
  }
}
</style>
