<template>
    <div class="carousel-wrapper">
        <Carousel :autoplay="5000" :loop="true" :wrap-around="true">
            <Slide v-for="(slide, index) in slides" :key="index">
                <img :src="slide.image" :alt="slide.alt" />
            </Slide>

            <template #addons>
                <Pagination />
            </template>
        </Carousel>
    </div>
</template>

<script setup>
import { Carousel, Slide, Pagination } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css'

const slides = [
    { image: 'https://image.toast.com/aaaaab/ticketlink/TKL_9/PC_TopBanner_후지이카제.jpg', alt: 'Slide 1' },
    { image: 'https://image.toast.com/aaaaab/ticketlink/TKL_3/PC_TopBanner_청춘폴나잇2024.jpg', alt: 'Slide 2' },
    { image: 'https://image.toast.com/aaaaab/ticketlink/TKL_8/PC_TopBanner_더크라이(1).jpg', alt: 'Slide 3' },
];
</script>

<style scoped>
.carousel-wrapper {
    max-width: 1000px;
    margin: 50px auto;
}

img {
    max-width: 100%;
    margin: 0 auto;
}
</style>