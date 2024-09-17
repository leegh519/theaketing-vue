<template>
    <div class="theater-info">
        <img :src="thumbnail" alt="연극 썸네일" class="thumbnail" />
        <div class="info">
            <h1>{{ name }}</h1>
            <p>공연장: {{ venue }}</p>
            <p>공연 기간: {{ startDate }} ~ {{ endDate }}</p>
            <p>예매 기간: {{ bookingStartDate }} ~ {{ bookingEndDate }}</p>
            <p>1인당 예매 가능 티켓: {{ maxTicketsPerPerson }}</p>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    thumbnail: String,
    name: String,
    venue: String,
    startDate: String,
    endDate: String,
    bookingStartDate: String,
    bookingEndDate: String,
    maxTicketsPerPerson: Number
});
</script>

<style scoped>
.theater-info {
    display: flex;
    align-items: center;
    gap: 20px;
}

.thumbnail {
    width: 200px;
    height: auto;
}

.info {
    display: flex;
    flex-direction: column;
}
</style>