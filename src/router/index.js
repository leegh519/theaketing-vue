import { createRouter, createWebHistory } from "vue-router";
import Home from "@/feature/home/view/Home.vue";
import Login from "@/feature/auth/view/Login.vue";
import SignUp from "@/feature/auth/view/SignUp.vue";
import DramaDetail from "@/feature/drama/view/DramaDetail.vue";
import Payment from "@/feature/payment/view/Payment.vue";
import MyReservation from "@/feature/user/view/MyReservation.vue";

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

export default router;
