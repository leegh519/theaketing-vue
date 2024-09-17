import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import { watch } from "vue";

export const userStore = defineStore("user", {
  state: () => ({
    id: null,
  }),
  actions: {
    setId(userId) {
      this.id = userId;
    },
  },
});

// 라우팅 기능을 설정하는 별도의 컴포넌트 또는 유틸리티 함수에서 사용
export function useUserStore() {
  const store = userStore();
  const router = useRouter();

  // 로그인, 로그아웃 시 홈으로 이동
  watch(
    () => store.id,
    (newId) => {
      router.push("/");
    }
  );

  return store;
}
