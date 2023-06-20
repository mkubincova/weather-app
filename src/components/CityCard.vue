<template>
    <router-link :to="{
        name: 'cityView',
        params: { state: city.state, city: city.city, country: city.country },
        query: { id: city.id, lat: city.coords.lat, lng: city.coords.lng },
    }" class="flex py-6 px-3 bg-weather-secondary rounded-md shadow-md cursor-pointer">
        <div class="flex flex-col flex-1 gap-2">
            <h2 class="text-3xl">{{ city.city }} {{ console.log(city)
            }}</h2>
            <h3 class="text-sm">{{ city.state ? `${city.state}, ` : '' }} {{ city.country }}</h3>
        </div>
        <div class="flex flex-col gap-2">
            <p class="text-3xl self-end">
                {{ Math.round(city.weather.main.temp) }}&deg;
            </p>
            <div class="flex gap-2">
                <span class="text-sm"><i class="fa-solid fa-arrow-up text-orange-300"></i> {{
                    Math.round(city.weather.main.temp_max)
                }}&deg;</span>
                <span class="text-sm"><i class="fa-solid fa-arrow-down text-blue-200"></i> {{
                    Math.round(city.weather.main.temp_min)
                }}&deg;</span>
            </div>
        </div>
    </router-link>
</template>

<script setup>
defineProps({
    city: {
        type: Object,
        default: () => { },
    }
});
</script>