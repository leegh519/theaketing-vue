<template>
    <div class="signup-wrapper">
        <div class="image-section"></div>
        <!-- 회원가입 폼 -->
        <div class="signup-container">
            <h1>회원가입</h1>
            <form class="signup-form" @submit.prevent="handleSignup">
                <!-- 이메일 입력과 인증 버튼 -->
                <div class="form-group">
                    <label for="email">이메일</label>
                    <div class="email-group">
                        <input v-model="email" type="email" id="email" name="email" @input="validateEmailAndSent" />
                        <button type="button" @click="sendVerificationCode">인증</button>
                    </div>
                    <p v-if="emailError" class="error-message">{{ emailError }}</p>
                    <p v-if="!emailError && emailSentError" class="error-message">{{ emailSentError }}</p>
                </div>

                <!-- 인증 코드 입력 -->
                <div class="form-group" v-if="emailSent">
                    <label for="verificationCode">인증 코드</label>
                    <div class="email-group">
                        <div class="email-container">
                            <input v-model="verificationCode" type="text" id="verificationCode" name="verificationCode"
                                @input="validateVerificationCode" />
                            <span v-if="remainingTime >= 0" class="timer">{{ formatTime(remainingTime) }}</span>
                        </div>
                        <button type="button" @click="verifyCode">확인</button>
                    </div>
                    <p v-if="verificationCodeError" class="error-message">{{ verificationCodeError }}</p>
                </div>

                <!-- 비밀번호 입력 -->
                <div class="form-group">
                    <label for="password">비밀번호</label>
                    <input v-model="password" type="password" id="password" name="password" @input="validatePassword" />
                    <p v-if="passwordError" class="error-message">{{ passwordError }}</p>
                </div>

                <!-- 비밀번호 확인 -->
                <div class="form-group">
                    <label for="confirmPassword">비밀번호 확인</label>
                    <input v-model="confirmPassword" type="password" id="confirmPassword" name="confirmPassword"
                        @input="validateConfirmPassword" />
                    <p v-if="confirmPasswordError" class="error-message">{{ confirmPasswordError }}</p>
                </div>

                <!-- 이름 입력 -->
                <div class="form-group">
                    <label for="name">이름</label>
                    <input v-model="name" type="text" id="name" name="name" @input="validateName" />
                    <p v-if="nameError" class="error-message">{{ nameError }}</p>
                </div>

                <!-- 휴대폰 번호 입력 -->
                <div class="form-group">
                    <label for="phone">휴대폰 번호</label>
                    <input v-model="phone" type="tel" id="phone" name="phone" @input="validatePhone" />
                    <p v-if="phoneError" class="error-message">{{ phoneError }}</p>
                </div>

                <!-- 회원가입 버튼 -->
                <button type="submit" :disabled="!isFormValid" :class="{ 'active': isFormValid }">회원가입</button>
            </form>
        </div>
    </div>
</template>
<script setup>
import { ref, computed } from "vue";
import api from '@/config/axios'
import Swal from "sweetalert2";
import { useUserStore } from '@/store/userStore'
import router from '@/router/index'

const userStore = useUserStore();

const email = ref("");
const emailError = ref("");
const emailSent = ref(false);
const emailSentError = ref("");
const remainingTime = ref(300);

const verificationCode = ref("");
const verificationCodeError = ref("");
const verifyAuthCode = ref(false);

const password = ref("");
const passwordError = ref("");

const confirmPassword = ref("");
const confirmPasswordError = ref("");

const name = ref("");
const nameError = ref("");

const phone = ref("");
const phoneError = ref("");
let timerId = null;  // 타이머 ID를 저장할 변수

// 타이머 시작
const startTimer = () => {
    if (timerId !== null) {
        clearInterval(timerId);  // 이미 타이머가 있다면 초기화
    }

    timerId = setInterval(() => {
        if (remainingTime.value > 0) {
            remainingTime.value--;
        } else {
            clearInterval(timerId); // 타이머가 끝나면 멈춤
            timerId = null;
        }
    }, 1000);
}

// 타이머 멈춤 (외부에서 호출할 수 있음)
const stopTimer = () => {
    if (timerId !== null) {
        clearInterval(timerId);  // 타이머 멈추기
        timerId = null;  // 타이머 ID 초기화
    }
}


const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// 유효성 검사 함수들
const validateEmailAndSent = () => {
    emailSent.value = false;
    verifyAuthCode.value = false
    verificationCode.value = ""
    verificationCodeError.value = ""
    validateEmail();
    validateEmailSent();
}

const validateEmail = () => {
    if (!email.value) {
        emailError.value = "이메일을 입력해주세요.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        emailError.value = "유효한 이메일 주소를 입력해주세요.";
    } else {
        emailError.value = "";
    }
};

const validateEmailSent = () => {
    if (!emailSent.value) {
        emailSentError.value = "이메일 인증을 해주세요";
    } else {
        emailSentError.value = ""
    }
}

const validateVerificationCode = () => {
    if (!verificationCode.value) {
        verificationCodeError.value = "인증 코드를 입력해주세요.";
    } else {
        verificationCodeError.value = "";
    }
};

const validatePassword = () => {
    if (!password.value) {
        passwordError.value = "비밀번호를 입력해주세요.";
    }
    else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,20}$/.test(password.value)) {
        passwordError.value = "비밀번호는 영어, 숫자, !@#$%^&*를 하나이상 포함하여 6~20자로 설정해야 합니다.";
    }
    else {
        passwordError.value = "";
    }
    validateConfirmPassword();
};

const validateConfirmPassword = () => {
    if (!confirmPassword.value) {
        confirmPasswordError.value = "비밀번호 확인을 입력해주세요.";
    } else if (confirmPassword.value !== password.value) {
        confirmPasswordError.value = "비밀번호가 일치하지 않습니다.";
    } else {
        confirmPasswordError.value = "";
    }
};

const validateName = () => {
    if (!name.value) {
        nameError.value = "이름을 입력해주세요.";
    } else {
        nameError.value = "";
    }
};

const validatePhone = () => {
    if (!phone.value) {
        phoneError.value = "휴대폰 번호를 입력해주세요.";
    } else if (!/^\d{10,11}$/.test(phone.value)) {
        phoneError.value = "유효한 휴대폰 번호를 입력해주세요.";
    } else {
        phoneError.value = "";
    }
};

const emailDuplicateCheck = async () => {
    try {
        await api.post('/api/u/v1/auth/duplicate', { email: email.value })
    } catch (error) {
        if (error.response?.data?.message) {
            if (error.response?.data?.code === 'A006') {
                verificationCodeError.value = error.response?.data?.message
            } else {
                Swal.fire({
                    text: error.response?.data?.message,
                    icon: "error",
                });
            }
        }
        return false;
    } finally {
        return true;
    }

}

// 이메일 인증 함수
const sendVerificationCode = async () => {
    validateEmail();
    if (!emailError.value) {
        if (!await emailDuplicateCheck()) {
            return;
        }
        startTimer();
        try {
            api.post('/api/u/v1/auth', { email: email.value })
            Swal.fire({
                text: '인증코드를 발송했습니다.',
                icon: "success",
            });
            emailSent.value = true;
            emailSentError.value = "";
        } catch (error) {
            if (error.response?.data?.message) {
                Swal.fire({
                    text: error.response?.data?.message,
                    icon: "error",
                });
            }
        }
    }
};

// 이메일 인증 확인
const verifyCode = async () => {
    validateVerificationCode();
    if (remainingTime.value <= 0) {
        Swal.fire({
            text: '인증번호가 만료되었습니다.',
            icon: "error",
        });
        verificationCodeError.value = '인증번호가 만료되었습니다.'
        return;
    }
    if (!verificationCodeError.value) {
        try {
            await api.post('/api/u/v1/auth/check',
                { email: email.value, authNumber: verificationCode.value })
            stopTimer();
            Swal.fire({
                text: '인증코드를 확인했습니다.',
                icon: "success",
            });
            verifyAuthCode.value = true;
        } catch (error) {
            if (error.response?.data?.message) {
                Swal.fire({
                    text: error.response?.data?.message,
                    icon: "error",
                });
            }
            verificationCodeError.value = '인증번호가 일치하지 않습니다.'
        }
    }
};

// 폼 유효성 확인
const isFormValid = computed(() => {
    return (
        !emailError.value &&
        !verificationCodeError.value &&
        !passwordError.value &&
        !confirmPasswordError.value &&
        !nameError.value &&
        !phoneError.value &&
        email.value &&
        verificationCode.value &&
        verifyAuthCode.value &&
        password.value &&
        confirmPassword.value &&
        name.value &&
        phone.value
    );
});

// 회원가입 처리 함수
const handleSignup = async () => {
    validateEmail();
    validateEmailSent();
    validateVerificationCode();
    validatePassword()
    validateConfirmPassword()
    validateName();
    validatePhone();

    if (isFormValid.value) {
        console.log("회원가입 정보:", {
            email: email.value,
            verificationCode: verificationCode.value,
            password: password.value,
            name: name.value,
            phone: phone.value,
        });
        // 실제 회원가입 처리 로직 추가
        try {
            const response = await api.post('/api/u/v1/signup', {
                email: email.value,
                password: password.value,
                name: name.value,
                phone: phone.value,
            })
            userStore.setId(response.data.id);
            await Swal.fire({
                text: '회원가입이 완료되었습니다!',
                icon: "success",
            })
            router.replace('/')

        } catch (error) {
            if (error.response?.data?.message) {
                Swal.fire({
                    text: error.response?.data?.message,
                    icon: "error",
                });
            }
        }
    }
};


</script>
<style scoped>
/* 로그인 페이지 전체 스타일 */
.signup-wrapper {
    display: flex;
    width: 100%;
    /* overflow: hidden; */
    height: calc(100vh - 50px);
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

.signup-container {
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
    background-color: #FFFFFFFF;
}

.signup-container h1 {
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
    text-align: center;
}

.signup-form .form-group {
    margin-bottom: 1rem;
    text-align: left;
}

.signup-form label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
}

.signup-form input {
    width: 350px;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

.signup-form .email-group {
    width: 350px;
    display: flex;
    align-items: center;
}

.email-container {
    position: relative;
    width: 300px;
    /* 인풋 박스 크기 */
}

.signup-form .email-group input {
    width: 300px;
    flex: 1;
    margin-right: 0.5rem;
    padding-right: 60px;
}

.timer {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 14px;
    color: #ff0000;
    /* 타이머 색상 */
}

.signup-form .email-group button {
    padding: 0.75rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.signup-form button[type="submit"] {
    margin: 10px auto;
    width: 350px;
    padding: 0.75rem;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    float: left;
}

.signup-form button:hover {
    background-color: #218838;
}

.error-message {
    color: red;
    font-size: 0.875rem;
    margin-top: 0.25rem;
}
</style>