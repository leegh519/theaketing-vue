<script setup>
import Navbar from '@/components/Navbar.vue';
</script>


<template>
    <div id="app">
        <Navbar />
        <div class="view">
            <router-view />
        </div>
    </div>
</template>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.view {
    padding-top: 50px;
}
</style>
