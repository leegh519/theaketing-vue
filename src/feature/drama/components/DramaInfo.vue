<template>
    <div class="theater-info">
        <img :src="thumbnailImage" alt="연극 썸네일" class="thumbnail" />
        <div class="info">
            <h1>{{ title }}</h1>
            <p>장소: {{ theater.name }}</p>
            <p>공연 기간: {{ startDate }} ~ {{ endDate }}</p>
            <p>예매 기간: {{ openDate }} ~ {{ closeDate }}</p>
            <p>가격: {{ price }}원</p>
            <p>1인당 예매 가능 티켓: {{ limitCount }}</p>
        </div>
    </div>
</template>

<script setup>
import { computed, toRefs } from 'vue';

const props = defineProps({
    eventData: {
        type: Object,
        required: false,
    },
});
const { title, thumbnailImage, theater, startDate, endDate, limitCount, price, openDateTime, closeDateTime } = toRefs(props.eventData);

const openDate = computed(() => {
    const date = new Date(openDateTime.value);

    return date.toISOString().split('T')[0];
})

const closeDate = computed(() => {
    const date = new Date(closeDateTime.value);

    return date.toISOString().split('T')[0];
})
</script>

<style scoped>
.theater-info {
    display: flex;
    align-items: center;
    align-items: flex-start;
    gap: 100px;

}

.thumbnail {
    width: 350px;
    height: auto;
}

.info {
    height: 100%;
    flex: 2;
    display: flex;
    flex-direction: column;
    align-items: baseline;
}
</style>