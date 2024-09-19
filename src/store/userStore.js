import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    id: null,
  }),
  actions: {
    setId(userId) {
      console.log(userId);
      this.id = userId;
    },
  },
  persist: true,
});
