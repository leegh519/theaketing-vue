<!-- TheaterDetailsImage.vue -->
<template>
    <div class="theater-details-image">
        <div class="title">
            <h1>상세정보</h1>
        </div>
        <img :src="detailImage" alt="연극 상세 정보" class="detail-image" />
    </div>
</template>

<script setup>
const props = defineProps({
    detailImage: String
});
</script>

<style scoped>
.theater-details-image {
    margin-top: 20px;
    text-align: center;
}

.title {
    margin-bottom: 50px;
    width: 100%;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
}

.detail-image {
    width: 100%;
    max-width: 1000px;
    height: auto;
}
</style>