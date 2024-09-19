<template>
    <div class="login-wrapper">
        <div class="image-section"></div>
        <!-- 로그인 폼 -->
        <div class="form-section">
            <h1>로그인</h1>
            <p class="promo-text">더 많은 기능을 경험해 보세요!</p>
            <form class="login-form" @submit.prevent="handleLogin">
                <div class="form-group">
                    <label for="username">이메일</label>
                    <input v-model="loginForm.username" type="text" id="username" name="username" required />
                    <p v-if="errors.username" class="error-message">{{ errors.username }}</p>
                </div>
                <div class="form-group">
                    <label for="password">비밀번호</label>
                    <input v-model="loginForm.password" type="password" id="password" name="password" required />
                    <p v-if="errors.password" class="error-message">{{ errors.password }}</p>
                </div>
                <button type="submit">로그인</button>
                <p class="signup-redirect">아직 회원이 아니신가요? <router-link to="/signup">회원가입</router-link></p>
            </form>
        </div>
    </div>
</template>
<script setup>
import { ref, getCurrentInstance } from "vue";
import router from '@/router/index'
import api from '@/config/axios';
import { useUserStore } from '@/store/userStore';
import Swal from "sweetalert2";
const { proxy } = getCurrentInstance();
const userStore = useUserStore();

const loginForm = ref({
    username: "",
    password: "",
});

const errors = ref({
    username: null,
    password: null,
});

const isSubmitting = ref(false);
const loginError = ref(null);

const validateUsername = () => {
    if (!loginForm.value.username) {
        errors.value.username = "아이디를 입력하세요";
    } else {
        errors.value.username = null;
    }
};

const validatePassword = () => {
    // 정규식 패턴 정의

    if (!loginForm.value.password) {
        errors.value.password = "비밀번호를 입력해주세요";
    } else {
        errors.value.password = null;
    }
};

const handleLogin = async () => {
    // 입력 값 유효성 검사
    validateUsername();
    validatePassword();

    // 오류가 있는지 확인
    if (errors.value.username || errors.value.password) {
        return;
    }

    // 로그인 시도 중 상태
    isSubmitting.value = true;
    loginError.value = null;

    try {
        const response = await api.post("/api/u/v1/login", {
            email: loginForm.value.username,
            password: loginForm.value.password,
        });

        userStore.setId(response.data.id);
        router.push('/')
    } catch (error) {
        if (error.response?.data?.message) {
            Swal.fire({
                text: error.response?.data?.message,
                icon: "error",
            });
        }
    } finally {
        isSubmitting.value = false;
    }
};
</script>
<style scoped>
/* 로그인 페이지 전체 스타일 */
.login-wrapper {
    display: flex;
    width: 100%;
    overflow: hidden;
    height: calc(100vh - 50px);
    /* 전체 높이에서 Navbar의 높이 50px을 제외 */
}

/* 왼쪽 절반: 이미지 */
.image-section {
    flex: 1;
    background: url('@/assets/theater.jpg') no-repeat center center;
    background-size: cover;
    height: 100vh;
    overflow: hidden;
    /* 이미지가 컨테이너를 꽉 채우도록 설정 */
}

/* (폼) */
.form-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    /* 뷰포트 높이에 맞게 설정 */
    padding: 2rem;
    /* 반투명 배경 */
    box-sizing: border-box;
}

/* 제목 스타일 */
.form-section h1 {
    margin-bottom: 1rem;
    font-size: 2rem;
    color: #000000FF;
}

/* 홍보용 문구 스타일 */
.promo-text {
    margin-bottom: 1.5rem;
    font-size: 1.25rem;
    color: #000000FF;
    text-align: center;
}

/* 폼 그룹 스타일 */
.form-group {
    margin-bottom: 1rem;
    width: 350px;
    text-align: left;
}

/* 레이블 스타일 */
.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
    color: #000000FF;
}

/* 입력 필드 스타일 */
.form-group input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

/* 버튼 스타일 */
button {
    width: 100%;
    padding: 0.75rem;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 1rem;
}

button:hover {
    background-color: #0056b3;
}

/* 회원가입 유도 문구 스타일 */
.signup-redirect {
    margin-top: 1rem;
    font-size: 0.875rem;
}

.signup-redirect a {
    color: #5DABFFFF;
    text-decoration: none;
}

.signup-redirect a:hover {
    text-decoration: underline;
}

.error-message {
    color: red;
    font-size: 0.875rem;
    margin-top: 0.25rem;
}
</style>