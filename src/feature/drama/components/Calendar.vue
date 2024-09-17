<template>
    <div class="calendar">
        <VCalendar title-position="left" :min-date="new Date(2024, 8, 1)" :max-date="new Date(2024, 10, 15)"
            :highlight="true" />

    </div>
</template>

<script setup>
import { ref } from 'vue';


</script>

<style scoped>
.calendar {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.calendar-header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 10px;
}

.calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 10px;
}

.calendar-day {
    padding: 10px;
    background-color: #f0f0f0;
    text-align: center;
    cursor: pointer;
}

.selected {
    background-color: #007bff;
    color: white;
}
</style>