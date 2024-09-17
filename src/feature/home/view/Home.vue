<template lang="">
    <div>
        <Slider/>
        <h1>추천공연</h1>
        <Search @updateSearchTerm="updateSearchTerm" />
        <DramaList :searchTerm="searchTerm"/>
    </div>
</template>
<script setup>
import Slider from '../components/Slider.vue';
import Search from '../components/Search.vue';
import DramaList from '../components/DramaList.vue';
import { ref } from 'vue';

const searchTerm = ref('');

// 검색어 업데이트
const updateSearchTerm = (newSearchTerm) => {
    searchTerm.value = newSearchTerm;
};

</script>
<style scoped></style>