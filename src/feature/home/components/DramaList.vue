<template>
    <div class="search-results">
        <div class="grid-container">
            <DramaListCard v-for="(item, index) in filteredItems" :key="index" :thumbnailImage="item.image"
                :title="item.title" :startDate="item.subtitle" />
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import DramaListCard from './DramaListCard.vue';

const props = defineProps({
    searchTerm: {
        type: String,
        required: true,
    },
});

const items = [
    { image: 'https://via.placeholder.com/150', title: 'Apple', subtitle: 'A red fruit' },
    { image: 'https://via.placeholder.com/150', title: 'Banana', subtitle: 'A yellow fruit' },
    { image: 'https://via.placeholder.com/150', title: 'Orange', subtitle: 'A citrus fruit' },
    { image: 'https://via.placeholder.com/150', title: 'Strawberry', subtitle: 'A small red fruit' },
    { image: 'https://via.placeholder.com/150', title: 'Strawberry', subtitle: 'A small red fruit' },
    { image: 'https://via.placeholder.com/150', title: 'Strawberry', subtitle: 'A small red fruit' },
    { image: 'https://via.placeholder.com/150', title: 'Strawberry', subtitle: 'A small red fruit' },
    { image: 'https://via.placeholder.com/150', title: 'Strawberry', subtitle: 'A small red fruit' },
    { image: 'https://via.placeholder.com/150', title: 'Strawberry', subtitle: 'A small red fruit' },
    { image: 'https://via.placeholder.com/150', title: 'Strawberry', subtitle: 'A small red fruit' },
    { image: 'https://via.placeholder.com/150', title: 'Strawberry', subtitle: 'A small red fruit' },
    { image: 'https://via.placeholder.com/150', title: 'Strawberry', subtitle: 'A small red fruit' },
];


// 검색어에 따라 필터링된 결과 계산
const filteredItems = computed(() => {
    return items.filter(item =>
        item.title.toLowerCase().includes(props.searchTerm.toLowerCase())
    );
});
</script>

<style scoped>
.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
}

.search-results {
    margin-top: 100px;
}
</style>