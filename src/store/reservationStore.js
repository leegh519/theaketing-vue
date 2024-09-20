import { defineStore } from "pinia";

export const useReservationStore = defineStore("reservation", {
  state: () => ({
    id: null,
    selectedDate: null,
    selectedTimes: null,
    ticketCount: null,
  }),
  actions: {
    set(id, selectedDate, selectedTimes, ticketCount) {
      this.id = id;
      this.selectedDate = selectedDate;
      this.selectedTimes = selectedTimes;
      this.ticketCount = ticketCount;
    },
  },
  persist: true,
});
