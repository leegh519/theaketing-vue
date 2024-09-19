import { defineStore } from "pinia";

export const userReservationStore = defineStore("reservation", {
  state: () => ({
    id: null,
  }),
  actions: {
    setId(userId) {
      this.id = userId;
    },
  },
  persist: true,
});
