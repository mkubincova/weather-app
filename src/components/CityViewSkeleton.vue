<template>
    <div class="flex flex-col items-center">
        <div class="py-6 px-4 max-w-screen-md w-full">
            <AnimatedPlaceholder class="w-full h-[56px]" />

            <div class="mt-8 card">
                <AnimatedPlaceholder class="w-full h-[100px]" />
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
                <div class="card-sm">
                    <AnimatedPlaceholder class="w-full h-[105px]" />
                </div>
                <div class="card-sm">
                    <AnimatedPlaceholder class="w-full h-[105px]" />
                </div>
                <div class="card-sm">
                    <AnimatedPlaceholder class="w-full h-[105px]" />
                </div>
                <div class="card-sm">
                    <AnimatedPlaceholder class="w-full h-[105px]" />
                </div>
            </div>
        </div>


        <div class="max-w-screen-md w-full pt-8 pb-4">
            <div class="mx-4">
                <AnimatedPlaceholder class="w-full h-[28px] mb-4" />
                <AnimatedPlaceholder class="w-full h-[126px] pb-4" />
            </div>
        </div>


        <div class="max-w-screen-md w-full py-8">
            <div class="mx-4">
                <AnimatedPlaceholder class="w-full h-[28px] mb-4" />
                <div class="card py-1">
                    <AnimatedPlaceholder class="w-full h-[415px]" />
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import AnimatedPlaceholder from "./AnimatedPlaceholder.vue";
</script>