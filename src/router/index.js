import { createRouter, createWebHistory } from "vue-router";
import Home from "@/feature/home/view/Home.vue";
import Login from "@/feature/auth/view/Login.vue";
import SignUp from "@/feature/auth/view/SignUp.vue";
import DramaDetail from "@/feature/drama/view/DramaDetail.vue";
import Payment from "@/feature/payment/view/Payment.vue";
import MyReservation from "@/feature/user/view/MyReservation.vue";
import { useUserStore } from "@/store/userStore";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/drama/:id",
    name: "DramaDetail",
    component: DramaDetail,
  },
  {
    path: "/payment/:id",
    name: "Payment",
    component: Payment,
  },
  {
    path: "/myReservation",
    name: "MyReservation",
    component: MyReservation,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const isAuthenticated = userStore.id !== null;

  if (to.name === "Payment" || to.name === "MyReservation") {
    if (!isAuthenticated) {
      Swal.fire({
        text: "로그인이 필요합니다",
        icon: "error",
        // showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "로그인",
      }).then((result) => {
        userStore.setId(null);
        // 로그인 페이지로 리다이렉트
        next({ name: "Login" });
      });
    } else {
      // 이동을 허용
      next();
    }
  } else {
    // 이동을 허용
    next();
  }
});

export default router;
