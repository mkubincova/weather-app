<template>
    <router-link :to="{
        name: 'cityView',
        params: { state: city.state, city: city.city, country: city.country },
        query: { id: city.id, lat: city.coords.lat, lng: city.coords.lng },
    }" class="flex gap-2 items-center p-3 rounded-md shadow-md cursor-pointer"
        :class="[sunIcons.includes(icon) ? 'bg-sun' : cloudIcons.includes(icon) ? 'bg-cloud' : rainIcons.includes(icon) ? 'bg-rain' : 'bg-night text-white']">
        <img class="w-[80px] h-auto object-contain"
            :src="`http://openweathermap.org/img/wn/${city.weather.weather[0].icon}@2x.png`" alt="">

        <div class="flex flex-col flex-1">
            <h2 class="text-2xl">{{ city.city }}</h2>
            <h3 class="text-xs opacity-70">{{ city.state ? `${city.state}, ` : '' }} {{ city.country }}</h3>
        </div>

        <p class="text-4xl">
            {{ Math.round(city.weather.main.temp) }}&deg;
        </p>
    </router-link>
</template>

<script setup>
defineProps({
    city: {
        type: Object,
        default: () => { },
    },
    icon: {
        type: String,
        default: () => '',
    }
});
</script>