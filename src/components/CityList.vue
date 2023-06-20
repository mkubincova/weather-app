<template>
    <CityCard v-for="city in savedCities" :key="city.id" :city="city" :icon="city.weather.weather[0].icon" />
    <p v-if="savedCities.length === 0">No locations added. To start tracking a location, search in the field above.</p>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import CityCard from './CityCard.vue';

const savedCities = ref([]);
const getCities = async () => {
    if (localStorage.getItem('savedCities')) {
        savedCities.value = JSON.parse(localStorage.getItem('savedCities'));

        const requests = [];
        savedCities.value.forEach((city) => {
            requests.push(
                axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lng}&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}&units=metric`)
            );
        });

        const weatherData = await Promise.all(requests);

        // flicker delay
        await new Promise((res) => setTimeout(res, 1000));

        weatherData.forEach((value, index) => {
            savedCities.value[index].weather = value.data;
        });
    }
};

await getCities();
</script>