<template>
    <div class="result-card" @click="toDetail(id)">
        <img :src="thumbnailImage" alt="result image" class="card-image" />
        <div class="card-content">
            <h3 class="card-title">{{ title }}</h3>
            <p class="card-subtitle">{{ startDate }} ~ {{ endDate }}</p>
            <p class="card-subtitle">{{ theater.name }}</p>
        </div>
    </div>
</template>

<script setup>
import { toRefs } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
    eventData: {
        type: Object,
        required: true,
    },
});
const { id, thumbnailImage, title, startDate, endDate, theater } = toRefs(props.eventData);

const toDetail = (id) => {
    router.push({ name: 'DramaDetail', params: { id } })
}
</script>

<style scoped>
.result-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    background-color: white;
    transition: transform 0.2s ease;
}

.result-card:hover {
    transform: translateY(-5px);
}

.card-image {
    width: 100%;
    height: 250px;
    object-fit: cover;
}

.card-content {
    padding: 10px;
}

.card-title {
    font-size: 18px;
    margin: 0;
}

.card-subtitle {
    font-size: 14px;
    color: #666;
}
</style>