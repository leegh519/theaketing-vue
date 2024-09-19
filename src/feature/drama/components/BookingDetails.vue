<template>
    <div class="booking-details-container">
        <!-- 달력 -->
        <div class="calendar">
            <Calendar @dateSelected="handleDateSelected" :showDates="showDates" />
        </div>

        <!-- 회차 정보 -->
        <div class="showtime-info">
            <h3>회차 정보</h3>
            <div v-for="showtime in showtimes" :key="showtime.id" @click="selectShowtime(showtime)">
                <div class="showtime" :class="{ 'color': selectedTimes == showtime }">
                    {{ showtime.time.split(':').slice(0, 2).join(':') }}
                </div>
            </div>
        </div>

        <!-- 남은 좌석 정보 -->
        <div class="seat-info">
            <h3>남은 좌석</h3>
            <div v-for="showtime in showtimes" :key="showtime.id">
                {{ showtime.remainSeats }}석
            </div>
        </div>

        <!-- 수량 선택 및 예매 버튼 -->
        <div class="ticket-selection">
            <h3>티켓 수량</h3>
            <div class="ticket-controls">
                <button @click="decreaseQuantity">-</button>
                <span>{{ ticketQuantity }}</span>
                <button @click="increaseQuantity">+</button>
            </div>
            <button class="book-button" @click="bookTickets">예매하기</button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Calendar from './Calendar.vue'; // 달력 컴포넌트 임포트
import api from '@/config/axios';
import { useUserStore } from '@/store/userStore';
import router from '@/router/index'
import Swal from 'sweetalert2';
const userStore = useUserStore();

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
    limitCount: {
        type: Number,
        required: true,
    }
});

const showtimes = ref([]);
const showDates = ref([]);
const selectedTimes = ref(null);

onMounted(() => {
    fetchDate();
});

const fetchDate = async () => {
    try {
        const response = await api.get(`/api/u/v1/drama/${props.id}/date`);
        showDates.value.push(...response.data);

    } catch (error) {
        if (error.response?.data?.message) {
            Swal.fire({
                text: error.response?.data?.message,
                icon: "error",
            });
        }
    } finally {
    }
}

const fetchShowTimes = async (date) => {
    try {
        const response = await api.get(`/api/u/v1/drama/${props.id}/${date}/time`);
        showtimes.value = response.data;
    } catch (error) {
        if (error.response?.data?.message) {
            Swal.fire({
                text: error.response?.data?.message,
                icon: "error",
            });
        }
    } finally {
    }
}

const reservation = async () => {
    try {
        const response = await api.post('/api/u/v1/reserve', {
            "dramaId": props.id,
            "showTimeId": selectedTimes.value.id,
            "ticketCount": ticketQuantity.value,
        });
        console.log(response.data)
        router.push('/payment');
    } catch (error) {
        if (error.response?.data?.message) {
            Swal.fire({
                text: error.response?.data?.message,
                icon: "error",
            });
        }
    } finally {
    }
}

// 상태 정의
const ticketQuantity = ref(1);

// 함수 정의
const handleDateSelected = (date) => {
    selectedTimes.value = null
    if (date) {
        fetchShowTimes(date.replaceAll('-', ''));
    } else {
        showtimes.value = null
    }
};

const selectShowtime = (showtime) => {
    selectedTimes.value = showtime;
    console.log('선택된 회차:', showtime);
};

const decreaseQuantity = () => {
    if (ticketQuantity.value > 1) ticketQuantity.value--;
};

const increaseQuantity = () => {
    if (ticketQuantity.value < props.limitCount) ticketQuantity.value++;
};

const bookTickets = () => {
    if (!selectedTimes.value) {
        Swal.fire({
            text: "회차를 선택해주세요",
        })
        return;
    }
    if (userStore.id) {
        console.log('티켓 예매:', ticketQuantity.value);
        reservation();
    } else {
        Swal.fire({
            text: "로그인이 필요한 서비스입니다\n로그인 하시겠습니까?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "로그인",
            cancelButtonText: "취소"
        }).then((result) => {
            if (result.isConfirmed) {
                router.push('/login');
            }
        });
    }
};
</script>

<style scoped>
.booking-details-container {
    display: inline-flex;
    justify-content: space-around;
    max-width: 1000px;
    /* 요소 사이 간격 */
    gap: 20px;
    /* 요소 간의 간격 */
    padding: 20px;
    margin: 50px 0;
}

.calendar {
    flex: 2;
    /* 달력이 좀 더 넓게 */
}

.color {
    background-color: #f1f5f9;
}

.showtime {
    border-radius: 4px;
    border: 1px solid grey;
    width: 150px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.showtime:hover {
    background-color: #f1f5f9;
}

.showtime-info,
.seat-info,
.ticket-selection {
    flex: 1;
    /* 나머지 요소는 동일한 크기 */
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
}

.ticket-controls {
    display: flex;
    align-items: center;
    gap: 10px;
}

.book-button {
    margin-top: 10px;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 150px;
}

.book-button:hover {
    background-color: #0056b3;
}
</style>