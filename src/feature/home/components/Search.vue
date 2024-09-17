<template>
    <div class="search-wrapper">
        <span class="search-icon">🔍</span>
        <input type="text" placeholder="검색어를 입력하세요..." class="search-input" @input="onInput" />
    </div>
</template>

<script setup>
const emit = defineEmits(['updateSearchTerm']);

// input 이벤트 발생 시 부모에게 검색어 전달
const onInput = (event) => {
    emit('updateSearchTerm', event.target.value);
};
</script>

<style scoped>
.search-wrapper {
    position: relative;
    max-width: 1000px;
    width: 100%;
    height: 50px;
    margin: 20px auto;
}

.search-input {
    width: 100%;
    height: 100%;
    padding-left: 50px;
    border: 1px solid #ccc;
    border-radius: 25px;
    font-size: 16px;
    box-sizing: border-box;
}

.search-icon {
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translateY(-50%);
    font-size: 20px;
    color: #888;
}
</style>