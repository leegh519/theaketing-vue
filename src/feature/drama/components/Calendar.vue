<template>
    <div class="calendar">
        <VCalendar title-position="left" @dayclick="handleDateClick" :disabled-dates="disabledDates" :min-date="mindate"
            :max-date="maxdate" />
    </div>
</template>

<script setup>
import { computed } from 'vue';
const emit = defineEmits(['dateSelected']);

const handleDateClick = (date) => {
    const result = props.showDates.filter((showDate) => showDate.showDate == date.id)
    if (result.length > 0) {
        emit('dateSelected', date.id);
    } else {
        emit('dateSelected', null);
    }
};

const props = defineProps({
    showDates: {
        type: Array,
        required: true,
    },
});

const mindate = computed(() => {
    if (props.showDates.length == 0) {
        return undefined;
    }
    let date = props.showDates[0];
    let today = new Date();
    return parseDate(date.showDate).getTime() < today.getTime() ? today : parseDate(date.showDate);
});

const maxdate = computed(() => {
    if (props.showDates.length == 0) {
        return undefined;
    }
    let date = props.showDates[props.showDates.length - 1];
    return parseDate(date.showDate);
});

// 날짜 문자열을 Date 객체로 변환하는 함수
const parseDate = (dateString) => new Date(dateString);


const adjustDate = (date, days) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
};



const disabledDates = computed(() => {
    if (props.showDates.length == 0) {
        return [{
            start: null,
            end: new Date(),
        },
        {
            start: new Date(),
            end: null,
        },];
    }
    const disabledRanges = [];
    let date = props.showDates[0];
    let first = parseDate(date.showDate);
    let start = null;
    let end = adjustDate(first, -1);
    disabledRanges.push({
        start: start,
        end: end,
    });
    disabledRanges.push({
        start: null,
        end: new Date(),
    });
    end = null;

    for (let index = 0; index < props.showDates.length; index++) {
        const arrDate = parseDate(props.showDates[index].showDate);

        if (first.getTime() == arrDate.getTime()) {
            first = adjustDate(first, 1)
            continue;
        }
        start = new Date(first);
        end = adjustDate(arrDate, - 1);
        first = adjustDate(arrDate, 1);
        if (start && end) {
            disabledRanges.push({
                start: start,
                end: end,
            });
        }
    }
    let last = props.showDates[props.showDates.length - 1];

    disabledRanges.push({
        start: adjustDate(parseDate(last.showDate), 1),
        end: null,
    });

    return disabledRanges;
});


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