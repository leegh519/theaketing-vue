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
                        <input v-model="email" type="email" id="email" name="email" @blur="validateEmail" />
                        <button type="button" @click="sendVerificationCode">인증</button>
                    </div>
                    <p v-if="emailError" class="error-message">{{ emailError }}</p>
                </div>

                <!-- 인증 코드 입력 -->
                <div class="form-group" v-if="emailSent">
                    <label for="verificationCode">인증 코드</label>
                    <div class="email-group">
                        <input v-model="verificationCode" type="text" id="verificationCode" name="verificationCode"
                            @blur="validateVerificationCode" /><button type="button"
                            @click="sendVerificationCode">확인</button>
                    </div>
                    <p v-if="verificationCodeError" class="error-message">{{ verificationCodeError }}</p>
                </div>

                <!-- 비밀번호 입력 -->
                <div class="form-group">
                    <label for="password">비밀번호</label>
                    <input v-model="password" type="password" id="password" name="password" @blur="validatePassword" />
                    <p v-if="passwordError" class="error-message">{{ passwordError }}</p>
                </div>

                <!-- 비밀번호 확인 -->
                <div class="form-group">
                    <label for="confirmPassword">비밀번호 확인</label>
                    <input v-model="confirmPassword" type="password" id="confirmPassword" name="confirmPassword"
                        @blur="validateConfirmPassword" />
                    <p v-if="confirmPasswordError" class="error-message">{{ confirmPasswordError }}</p>
                </div>

                <!-- 이름 입력 -->
                <div class="form-group">
                    <label for="name">이름</label>
                    <input v-model="name" type="text" id="name" name="name" @blur="validateName" />
                    <p v-if="nameError" class="error-message">{{ nameError }}</p>
                </div>

                <!-- 휴대폰 번호 입력 -->
                <div class="form-group">
                    <label for="phone">휴대폰 번호</label>
                    <input v-model="phone" type="tel" id="phone" name="phone" @blur="validatePhone" />
                    <p v-if="phoneError" class="error-message">{{ phoneError }}</p>
                </div>

                <!-- 회원가입 버튼 -->
                <button type="submit" :disabled="!isFormValid">회원가입</button>
            </form>
        </div>
    </div>
</template>
<script>
import { ref, computed } from "vue";

export default {
    setup() {
        const email = ref("");
        const emailError = ref("");
        const emailSent = ref(false);

        const verificationCode = ref("");
        const verificationCodeError = ref("");

        const password = ref("");
        const passwordError = ref("");

        const confirmPassword = ref("");
        const confirmPasswordError = ref("");

        const name = ref("");
        const nameError = ref("");

        const phone = ref("");
        const phoneError = ref("");

        // 유효성 검사 함수들
        const validateEmail = () => {
            if (!email.value) {
                emailError.value = "이메일을 입력해주세요.";
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
                emailError.value = "유효한 이메일 주소를 입력해주세요.";
            } else {
                emailError.value = "";
            }
        };

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
            } else if (password.value.length < 6) {
                passwordError.value = "비밀번호는 최소 6자리여야 합니다.";
            } else {
                passwordError.value = "";
            }
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

        // 이메일 인증 함수
        const sendVerificationCode = () => {
            validateEmail();
            if (!emailError.value) {
                emailSent.value = true;
                console.log("인증 코드 발송:", email.value);
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
                password.value &&
                confirmPassword.value &&
                name.value &&
                phone.value
            );
        });

        // 회원가입 처리 함수
        const handleSignup = () => {
            if (isFormValid.value) {
                console.log("회원가입 정보:", {
                    email: email.value,
                    verificationCode: verificationCode.value,
                    password: password.value,
                    name: name.value,
                    phone: phone.value,
                });
                // 실제 회원가입 처리 로직 추가
            }
        };

        return {
            email,
            emailError,
            emailSent,
            verificationCode,
            verificationCodeError,
            password,
            passwordError,
            confirmPassword,
            confirmPasswordError,
            name,
            nameError,
            phone,
            phoneError,
            isFormValid,
            validateEmail,
            validateVerificationCode,
            validatePassword,
            validateConfirmPassword,
            validateName,
            validatePhone,
            sendVerificationCode,
            handleSignup,
        };
    },
};

</script>
<style scoped>
/* 로그인 페이지 전체 스타일 */
.signup-wrapper {
    display: flex;
    width: 100%;
    /* overflow: hidden; */
    height: calc(100vh - 50px);
    /* 전체 높이에서 Navbar의 높이 50px을 제외 */
}

/* 왼쪽 절반: 이미지 */
.image-section {
    flex: 1;
    background: url('@/assets/theater.jpg') no-repeat center center;
    background-size: cover;
    height: 100vh;
    /* overflow: hidden; */
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
    display: flex;
    align-items: center;
}

.signup-form .email-group input {
    width: 300px;
    flex: 1;
    margin-right: 0.5rem;
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
    width: 100%;
    padding: 0.75rem;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
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