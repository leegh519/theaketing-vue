<template>
    <h1>나의 예매내역</h1>
    <div class="reservation-list">
        <!-- 예매 내역 리스트 -->
        <div v-for="(reservation, index) in reservations" :key="reservation.id" class="reservation-item">
            <img :src="reservation.drama.thumbnailImage" alt="Thumbnail" class="thumbnail" />
            <div class="reservation-info">
                <h3>{{ reservation.drama.title }}</h3>
                <p>{{ reservation.drama.theater.name }}<br>
                    {{ reservation.date.showDate }} {{ reservation.date.startTime.split(':').slice(0,
                        2).join(':') }}
                    <br>
                    예매 수량: {{ reservation.ticketCount }}명
                </p>
            </div>
            <button @click="cancelReservation(reservation.id)" class="cancel-button">예매 취소</button>
        </div>

        <!-- 페이징 처리 -->
        <div class="pagination">
            <button @click="goToPage(pageNum - 1)" :disabled="pageNum === 1">←</button>
            <span v-for="page in pagesToShow" :key="page">
                <button @click="goToPage(page)" :class="{ active: page === pageNum }">{{ page }}</button>
            </span>
            <button @click="goToPage(pageNum + 1)" :disabled="pageNum === page.totalPage">→</button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import api from '@/config/axios';
import router from '@/router/index'
import Swal from 'sweetalert2';

const route = useRoute();

const pageNum = computed(() => route.query.pageNum ? Number(route.query.pageNum) : 1);

// 예매 내역 더미 데이터
const page = ref({});
const reservations = computed(() => page.value.content);

const pagesToShow = computed(() => {
    const half = Math.floor(page.value.pageSize / 2);
    let start = Math.max(1, pageNum - half);
    let end = Math.min(page.value.totalPage, start + page.value.pageSize - 1);

    // 총 페이지 수가 5보다 적을 경우, 1부터 totalPage까지 보여줌
    if (page.value.totalPage < page.value.pageSize) {
        start = 1;
        end = page.value.totalPage;
    }

    // 페이지 번호 배열을 생성
    const pages = [];
    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    return pages;
});

onMounted(() => {
    fetchData();
});
watch(
    () => pageNum.value,
    (newPageNum) => {
        fetchData();
    }
);

const fetchData = async () => {
    try {
        const response = await api.get('/api/u/v1/reserve', {
            params: {
                pageNum: pageNum.value,
                itemSize: 10,
            }
        })
        page.value = response.data;
    } catch (error) {
        if (error.response?.data?.message) {
            Swal.fire({
                text: error.response?.data?.message,
                icon: "error",
            });
        }
    }
}


// 페이지 이동 함수
const goToPage = (nextPage) => {
    if (nextPage >= 1 && nextPage <= page.value.totalPage) {
        pageNum.value = nextPage;
        router.push({ query: { pageNum: nextPage } })
    }
};

// 예매 취소 함수
const cancelReservation = async (id) => {
    const result = await Swal.fire({
        text: '정말로 예매를 취소하시겠습니까?',
        icon: "question",
        cancelButtonText: '닫기',
        showCancelButton: true,
        confirmButtonText: '취소하기',
    })
    if (result.isConfirmed) {
        try {
            const response = await api.delete(`/api/u/v1/reserve/${id}`);
            fetchData();
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
.reservation-list {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.reservation-item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    padding: 5px 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.thumbnail {
    width: 120px;
    height: 150px;
    object-fit: cover;
    border-radius: 8px;
    margin-right: 20px;
}

.reservation-info {
    flex-grow: 1;
}

.cancel-button {
    background-color: #e74c3c;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
}

.cancel-button:hover {
    background-color: #c0392b;
}

.pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.pagination button {
    background-color: #42b983;
    color: white;
    border: none;
    padding: 8px 16px;
    margin: 0 4px;
    border-radius: 4px;
    cursor: pointer;
}

.pagination button.active {
    background-color: #1b7f55;
}

.pagination button:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
}
</style>