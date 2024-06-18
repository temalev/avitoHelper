<template>
  <div class="datepicker">
    <input :value="new Date(chooseDay)" type="text" @click="isOpen = true" />
  <div v-if="isOpen" class="main">
    <header>
      <button @click="clickLastMonth">&lt;</button>
      <span class="title">{{ currentMonthName }} {{ howYear }}</span>
      <button @click="clickNextMonth">&gt;</button>
    </header>

    <div class="body">
      <div class="daysOfWeek">
        <div v-for="dayOfWeek in daysString" :key="dayOfWeek" class="dayOfWeek">
          {{ dayOfWeek }}
        </div>
      </div>

      <div class="daysContainer">
        <div v-for="dayNull in dayWeek" :key="dayNull" class="day null" />

        <div
          v-for="day in dayMonth"
          :key="day.timestamp"
          class="day"
          :class="getClassDay(day)"
          @click="dayChoose(day)"
        >
          {{ day.name }}
          <span class="tooltip">{{ getTooltipEvent(day) }}</span>
        </div>
      </div>
    </div>
  </div>
</div>

</template>

<script>
export default {
  name: "Calendar",

  props: {
    events: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      daysString: ["пн", "вт", "ср", "чт", "пт", "сб", "вс"],
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
      currentDay: new Date().getDate(),
      YearNow: new Date().getFullYear(),
      chooseDay: null,
      isOpen: false,
    };
  },

  computed: {
    currentMonthName() {
      return new Date(this.currentYear, this.currentMonth).toLocaleString(
        "default",
        { month: "long" }
      );
    },

    howYear() {
      if (this.nextMonthInt === 0) return this.currentYear;
      else return this.currentYear;
    },

    currentMonthNameInt() {
      return new Date(this.currentYear, this.currentMonth).getMonth();
    },

    dayMonth() {
      const count = new Date(
        this.currentYear,
        this.currentMonth + 1,
        0
      ).getDate();
      const arr = [];

      for (let i = 1; i <= count; i++) {
        arr.push({
          name: i,
          timestamp: new Date(this.currentYear, this.currentMonth, i).getTime(),
        });
      }
      return arr;
    },

    dayWeek() {
      return new Date(this.currentYear, this.currentMonth, 0).getDay();
    },
  },
  methods: {
    
    getTooltipEvent(day) {
      const dayEvent = this.events.find((el) => el.day === day.timestamp);
      if (day.timestamp == dayEvent?.day) {
        console.log(dayEvent?.info);
        return dayEvent?.info;
      }
    },
    getClassDay(day) {
      if (this.chooseDay === day.timestamp) {
        return "choose";
      }

      const dayEvent = this.events.find((el) => el.day === day.timestamp);

      if (day.timestamp == dayEvent?.day) {
        return "event";
      }
    },

    dayChoose(day) {
      this.chooseDay = this.chooseDay != day.timestamp ? day.timestamp : null;
      const date = new Date(this.chooseDay);
      const fullDate = {
        dateFormatted: [
          date.getDate().toString().padStart(2, "0"),
          (date.getMonth() + 1).toString().padStart(2, "0"),
          date.getFullYear(),
        ].join("."),
        timestamp: this.chooseDay,
      };

      this.$emit("chooseDay", this.chooseDay != null ? fullDate : null);
    },

    clickNextMonth() {
      this.currentMonth++;

      if (this.currentMonth === 12) {
        this.currentYear++;
        this.currentMonth = 0;
      }
    },
    clickLastMonth() {
      this.currentMonth--;

      if (this.currentMonth === -1) {
        this.currentYear--;
        this.currentMonth = 11;
      }
    },
  },
};
</script>

<style scoped>

.datepicker {
  position: relative;
}
.main {
  position: absolute;
  z-index: 2;
  top: 45px;
  left: 0;
  background-color: #fff;
  width: 280px;
  border: 1px solid rgb(174, 174, 174);
  border-radius: 5px;
  padding: 0 10px 10px 10px;
  box-shadow: 0px 10px 20px #cfcfcfa2;
  z-index: 999999999999;
}

header {
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.daysOfWeek {
  display: flex;
  width: 100%;
  justify-content: flex-start;
}

.dayOfWeek {
  width: 40px;
  height: 30px;
}

.daysContainer {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.day {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 5px;
}

.day:hover {
  outline: 1px solid rgba(156, 156, 156, 0.661);
}

.null {
  outline: none !important;
  cursor: default;
}

button {
  background: none;
  border: none;
  cursor: pointer;
  opacity: 0.5;
  transition: 0.2s;
}

button:hover {
  opacity: 1;
}

.choose {
  background-color: rgba(34, 113, 24, 0.824);
  color: #f6f6f6;
  box-shadow: inset 0 0 5px rgba(23, 76, 16, 0.824);
}

.event {
  position: relative;
  outline: 2px solid rgba(34, 113, 24, 0.824);
}

.tooltip {
  position: absolute;
  min-width: 100px;
  border: 1px solid rgba(34, 113, 24, 0.824);
  border-radius: 15px;
  padding: 5px 10px;
  cursor: help;
  display: none;
  justify-content: center;
  align-items: center;
  opacity: 0;
  background-color: #fff;
  bottom: 40px;
  box-shadow: 0 2px 5px rgba(213, 213, 213, 0.635);
}

.tooltip::before {
  transform: translateX(-50%);
  border-width: 4px 6px 0 6px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.7) transparent transparent transparent;
}

.event:hover .tooltip {
  display: flex;
  opacity: 1;
}

.tooltip:hover {
  display: flex;
}
</style>
