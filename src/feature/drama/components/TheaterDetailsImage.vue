<!-- TheaterDetailsImage.vue -->
<template>
    <div class="theater-details-image">
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

.detail-image {
    width: 100%;
    max-width: 1000px;
    height: auto;
}
</style>