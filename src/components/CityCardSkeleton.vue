<template>
    <div class="flex gap-2 items-center p-3 rounded-md shadow-md cursor-pointer">
        <AnimatedPlaceholder class="w-[80px] h-[80px]" />

        <div class="flex flex-col flex-1 gap-1">
            <AnimatedPlaceholder class="max-w-[140px] h-[32px]" />
            <AnimatedPlaceholder class="max-w-[120px] h-[16px]" />
        </div>

        <AnimatedPlaceholder class="w-[55px] h-[40px]" />
    </div>
</template>

<script setup>
import AnimatedPlaceholder from './AnimatedPlaceholder.vue';
</script>