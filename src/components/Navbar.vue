<template>
    <div class="navbar">
        <div class="nav-container">
            <div></div>
            <nav class="nav-menu">
                <ul>
                    <li><router-link to="/">홈</router-link></li>
                    <li v-if="isAuthenticated"><router-link to="/signup">예매내역</router-link></li>
                    <li v-if="!isAuthenticated"><router-link to="/login">로그인/회원가입</router-link></li>
                    <!-- <li v-if="!isAuthenticated"><router-link to="/signup">회원가입</router-link></li> -->
                    <li v-if="isAuthenticated"><router-link to="" @click="logout">로그아웃</router-link></li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useUserStore } from '@/store/userStore';
const userStore = useUserStore();
const isAuthenticated = computed(() => userStore.id !== null);

const logout = () => {
    userStore.setId(null);
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background-color: #FFFFFF;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    display: flex;
    justify-content: center;
}

.nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1000px;
    width: 100%;
    height: 50px;
}

.logo {
    height: 50px;
}

.nav-menu ul {
    list-style: none;
    display: flex;
}

.nav-menu ul li {
    margin-left: 20px;
}

.nav-menu ul li a {
    text-decoration: none;
    color: #000000FF;
    font-size: 16px;
    transition: color 0.3s;
}

.nav-menu ul li a:hover {
    color: #007bff;
}

.cart-user {
    display: flex;
    align-items: center;
}

.cart-icon,
.user-icon {
    font-size: 20px;
    margin-left: 20px;
    cursor: pointer;
    color: #333;
}

.cart-icon:hover,
.user-icon:hover {
    color: #007bff;
}
</style>