import axios from "axios";
import router from "@/router/index";
import { useUserStore } from "@/store/userStore";
import Swal from "sweetalert2";

const apiUrl = import.meta.env.VITE_API_URL;
// axois 설정
const api = axios.create({
  baseURL: apiUrl, // 공통으로 사용할 기본 API URL 설정
  timeout: 30000, // 요청 타임아웃 설정
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 쿠키 전송 허용 (필요한 경우)
});

api.interceptors.response.use(
  (response) => {
    // 응답 데이터를 가공하거나, 로그를 기록하는 작업
    console.log("Response:", response);

    return response;
  },
  (error) => {
    // 응답 오류 처리
    if (error.response && error.response.status === 401) {
      Swal.fire({
        text: "세션이 만료되었습니다\n로그인이 필요합니다",
        icon: "question",
        // showCancelButton: true,
        confirmButtonColor: "#3085d6",
        // cancelButtonColor: "#d33",
        confirmButtonText: "로그인",
        // cancelButtonText: "취소",
      }).then((result) => {
        if (result.isConfirmed) {
          const userStore = useUserStore();
          userStore.setId(null);
          router.push("/login");
        }
      });
      return;
    }

    return Promise.reject(error);
  }
);

export default api;
