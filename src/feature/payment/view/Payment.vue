<template>
    <div class="drama-detail-wrapper">

        <div class="drama-detail">
            <!-- 썸네일 이미지 -->
            <img :src="dramaStore.thumbnailImage" alt="Drama Thumbnail" class="thumbnail" />

            <!-- 연극 정보 -->
            <div class="drama-info">
                <h2>{{ dramaStore.title }}</h2>
                <p>{{ reservationStore.selectedDate }}
                    <br>
                    {{ reservationStore.selectedTimes.time.split(':').slice(0,
                        2).join(':') }}
                </p>
                <p>{{ dramaStore.price * reservationStore.ticketCount }}원</p>
            </div>

            <!-- 결제 버튼 -->
            <button @click="payment" class="payment-button">결제하기</button>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();
const id = route.params.id;
import { useDramaStore } from '@/store/dramaStore';
import { useReservationStore } from '@/store/reservationStore';
import api from '@/config/axios';
import Swal from 'sweetalert2';
import router from '@/router/index';

const dramaStore = useDramaStore();
const reservationStore = useReservationStore();


const payment = async () => {
    console.log('결제한다')
    try {
        const response = await api.post('/api/u/v1/payment', {
            reservationId: reservationStore.id,
        })

        await Swal.fire({
            text: '예매가 완료되었어요!',
            icon: "success",
        });
        router.push({ name: 'MyReservation', query: { pageNum: 1 } })
    } catch (error) {
        if (error.response?.data?.message) {
            Swal.fire({
                text: error.response?.data?.message,
                icon: "error",
            });
        }
    }
}



</script>
<style scoped>
.drama-detail-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
    /* 화면 전체 높이를 채우기 위해 */
}

.drama-detail {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 350px;
    margin: 0 auto;
    border: 1px solid #ddd;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.thumbnail {
    width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 16px;
}

.drama-info {
    text-align: center;
    margin-bottom: 16px;
}

.drama-info p {
    font-size: 18px;
}

.payment-button {
    background-color: #42b983;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
}

.payment-button:hover {
    background-color: #369f75;
}
</style>