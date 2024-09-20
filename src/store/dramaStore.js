import { defineStore } from "pinia";

export const useDramaStore = defineStore("drama", {
  state: () => ({
    title: null,
    thumbnailImage: null,
    theater: null,
    startDate: null,
    endDate: null,
    limitCount: null,
    price: null,
    openDateTime: null,
    closeDateTime: null,
  }),
  actions: {
    set(drama) {
      this.title = drama.title;
      this.thumbnailImage = drama.thumbnailImage;
      this.theater = drama.theater;
      this.startDate = drama.startDate;
      this.endDate = drama.endDate;
      this.limitCount = drama.limitCount;
      this.price = drama.price;
      this.openDateTime = drama.openDateTime;
      this.closeDateTime = drama.closeDateTime;
    },
  },
  persist: true,
});
