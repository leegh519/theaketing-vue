<template>
    <div class="theater-detail-page">
        <DramaInfo :thumbnail="theater.thumbnail" :name="theater.name" :venue="theater.venue"
            :startDate="theater.startDate" :endDate="theater.endDate" :bookingStartDate="theater.bookingStartDate"
            :bookingEndDate="theater.bookingEndDate" :maxTicketsPerPerson="theater.maxTicketsPerPerson" />

        <BookingDetails />

        <TheaterDetailsImage :detailImage="theater.detailImage" />
    </div>
</template>

<script setup>
import DramaInfo from '../components/DramaInfo.vue';
import BookingDetails from '../components/BookingDetails.vue';
import TheaterDetailsImage from '../components/TheaterDetailsImage.vue';

const theater = {
    thumbnail: 'https://image.toast.com/aaaaab/ticketlink/TKL_8/ps_pst0624.jpg',
    name: '멋진 연극',
    venue: '공연장 A',
    startDate: '2024-09-20',
    endDate: '2024-10-15',
    bookingStartDate: '2024-09-01',
    bookingEndDate: '2024-10-10',
    maxTicketsPerPerson: 4,
    detailImage: 'https://image.toast.com/aaaaab/ticketlink/TKL_2/ps_info0624a_optimized.jpg'
};
</script>

<style scoped>
.theater-detail-page {
    display: flex;
    flex-direction: column;
    gap: 20px;
}
</style>