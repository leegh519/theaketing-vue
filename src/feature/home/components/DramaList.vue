<template>
    <div class="search-results" ref="scrollContainer" @scroll="handleScroll">
        <div v-if="list" class="grid-container">
            <DramaListCard v-for="(item, index) in list" :key="index" :eventData="item" />
        </div>
        <div v-else>
            no data
        </div>
        <div v-if="isLoading">Loading...</div>
    </div>
</template>

<script setup>
import DramaListCard from './DramaListCard.vue';
import { computed, onMounted, ref, watch, onBeforeUnmount } from 'vue';
import axios from "axios";
import debounce from 'lodash/debounce';

const props = defineProps({
    searchTerm: {
        type: String,
        required: true,
    },
});

const scrollContainer = ref(null);

const page = ref({
    content: [],
    pageNum: 1,
    totalPage: 1,
    endPage: 1,
    startPage: 1,
    totalCount: 0,
});

const isLoading = ref(false);

const params = computed(() => {
    return {
        searchValue: props.searchTerm,
        pageNum: page.value.pageNum,
        itemSize: 15,
    };
});

const fetchData = async () => {
    if (isLoading.value) return;

    isLoading.value = true;

    try {
        console.log(params.value);

        const response = await axios.get("/api/u/v1/drama", {
            params: params.value
        });
        page.value.content.push(...response.data.content);

        page.value.pageNum++;
        page.value.totalPage = response.data.totalPage;
        page.value.endPage = response.data.endPage;
    } catch (error) {
        alert(error.response?.data?.message);
    } finally {
        isLoading.value = false;
    }
};
const debouncedFetchData = debounce(fetchData, 300);

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
    fetchData();
});

onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
});

watch(() => props.searchTerm, (newSearchTerm) => {
    page.value.content = []; // 기존 데이터 초기화
    page.value.pageNum = 1; // 페이지 번호 초기화
    console.log(newSearchTerm);
    params.value.searchValue = newSearchTerm; // 검색어 업데이트
    debouncedFetchData(); // 데이터 재요청
});

const handleScroll = () => {
    const container = scrollContainer.value;
    if (!container) return;

    // 스크롤이 컨테이너의 맨 아래에 도달하면 데이터 요청
    if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
        if (page.value.pageNum > page.value.totalPage || isLoading.value) return; // 마지막 페이지거나 요청 중이면 종료
        debouncedFetchData();
    }
};

const list = computed(() => page.value.content);




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
    margin: 100px auto;
}
</style>