<template>

    <div class="theater-detail-page" v-if="drama && Object.keys(drama).length > 0">

        <DramaInfo :eventData="drama" />

        <BookingDetails :id="id" :limitCount="drama.limitCount" />

        <TheaterDetailsImage :detailImage="drama.descriptionImage" />
    </div>
</template>

<script setup>
import DramaInfo from '../components/DramaInfo.vue';
import BookingDetails from '../components/BookingDetails.vue';
import TheaterDetailsImage from '../components/TheaterDetailsImage.vue';
import api from '@/config/axios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Swal from 'sweetalert2';

const route = useRoute();
const id = route.params.id;



const drama = ref({});


onMounted(async () => {
    await fetchDetail();
});

const fetchDetail = async () => {
    try {

        const response = await api.get(`/api/u/v1/drama/${id}`);
        drama.value = response.data;

    } catch (error) {
        if (error.response?.data?.message) {
            Swal.fire({
                text: error.response?.data?.message,
                icon: "error",
            });
        }
    } finally {
    }
};

</script>

<style scoped>
.theater-detail-page {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: 100px auto;
    max-width: 1000px;
}
</style>