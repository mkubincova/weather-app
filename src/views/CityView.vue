<template>
    <div>
        <Suspense>
            <AsyncCityView />

            <template #fallback>
                <div class="container">
                    <p class="text-white pt-3">Loading...</p>
                </div>
            </template>
        </Suspense>
    </div>
</template>

<script setup>
import AsyncCityView from '../components/AsyncCityView.vue';
</script>