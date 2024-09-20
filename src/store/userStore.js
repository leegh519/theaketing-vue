import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
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
