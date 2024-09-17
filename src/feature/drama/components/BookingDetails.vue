<template>
    <div class="booking-details-container">
        <!-- 달력 -->
        <div class="calendar">
            <Calendar @dateSelected="handleDateSelected" />
        </div>

        <!-- 회차 정보 -->
        <div class="showtime-info">
            <h3>회차 정보</h3>
            <div v-for="showtime in showtimes" :key="showtime.id" @click="selectShowtime(showtime)">
                {{ showtime.time }}
            </div>
        </div>

        <!-- 남은 좌석 정보 -->
        <div class="seat-info">
            <h3>남은 좌석</h3>
            <p>{{ remainingSeats }}석 남음</p>
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
import { ref } from 'vue';
import Calendar from './Calendar.vue'; // 달력 컴포넌트 임포트

// 상태 정의
const showtimes = ref([
    { id: 1, time: '12:00 PM' },
    { id: 2, time: '3:00 PM' },
    { id: 3, time: '6:00 PM' },
]);

const remainingSeats = ref(30);
const ticketQuantity = ref(1);

// 함수 정의
const handleDateSelected = (date) => {
    console.log('선택된 날짜:', date);
};

const selectShowtime = (showtime) => {
    console.log('선택된 회차:', showtime);
};

const decreaseQuantity = () => {
    if (ticketQuantity.value > 1) ticketQuantity.value--;
};

const increaseQuantity = () => {
    ticketQuantity.value++;
};

const bookTickets = () => {
    console.log('티켓 예매:', ticketQuantity.value);
};
</script>

<style scoped>
.booking-details-container {
    display: flex;
    justify-content: space-between;
    max-width: 1000px;
    /* 요소 사이 간격 */
    gap: 20px;
    /* 요소 간의 간격 */
    padding: 20px;
}

.calendar {
    flex: 2;
    /* 달력이 좀 더 넓게 */
}

.showtime-info,
.seat-info,
.ticket-selection {
    flex: 1;
    /* 나머지 요소는 동일한 크기 */
    display: flex;
    flex-direction: column;
    justify-content: center;
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
}

.book-button:hover {
    background-color: #0056b3;
}
</style>