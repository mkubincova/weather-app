<template>
    <div class="flex flex-col flex-1 items-center"
        :class="[sunIcons.includes(weatherData.current.weather[0].icon) ? 'bg-sun' : cloudIcons.includes(weatherData.current.weather[0].icon) ? 'bg-cloud' : rainIcons.includes(weatherData.current.weather[0].icon) ? 'bg-rain' : 'bg-night text-white']">
        <!-- Banner -->
        <div v-if="route.query.preview" class="p-4 bg-black bg-opacity-20 shadow-inner w-full text-center">
            <p class="text-sm">You are currently previewing this city, click on the "+" plus icon to save it.</p>
        </div>

        <!-- Wether overview -->
        <div class="py-6 px-4 max-w-screen-md w-full">
            <div class="flex">
                <div class="flex-1">
                    <h1 class="text-3xl">{{ route.params.city }}</h1>
                    <p class="text-sm opacity-70">
                        {{ new Date(weatherData.currentTime).toLocaleString("en-gb", {
                            weekday: "long",
                            day: "2-digit",
                            month: "long"
                        }) }}
                    </p>
                </div>
                <div class="text-right">
                    <p class="text-3xl">{{ new Date(weatherData.currentTime).toLocaleString("en-gb", {
                        timeStyle: "short"
                    }) }}</p>
                    <p class="text-sm opacity-70">UTC{{ weatherData.timezone_offset > 0 ? '+' : '' }}{{
                        weatherData.timezone_offset !== 0 ?
                        weatherData.timezone_offset / 60 / 60 : "" }}</p>
                </div>
            </div>

            <div class="flex gap-2 mt-8 bg-white bg-opacity-30 p-4 text-shadow rounded-md shadow-md">
                <div class="flex-1 flex flex-col">
                    <p class="text-7xl mb-2">
                        {{ Math.round(weatherData.current.temp) }}&deg;
                    </p>
                    <div class="flex gap-2">
                        <span class="text-sm"><i class="fa-solid fa-arrow-up text-orange-400"></i> {{
                            Math.round(weatherData.daily[0].temp.max)
                        }}&deg;</span>
                        <span class="text-sm"><i class="fa-solid fa-arrow-down text-blue-400"></i> {{
                            Math.round(weatherData.daily[0].temp.min)
                        }}&deg;</span>
                        <span class="text-sm"><i class="fa-solid fa-shirt text-white"></i> {{
                            Math.round(weatherData.current.feels_like)
                        }}&deg;</span>
                    </div>
                </div>
                <div class="flex flex-col items-end justify-end relative min-w-[100px]">
                    <p class="capitalize">{{ weatherData.current.weather[0].description }}</p>
                    <img class="w-[100px] h-auto object-contain absolute -top-5 -right-4"
                        :src="`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`" alt="">
                </div>
            </div>
        </div>

        <hr class="border-white border-opacity-10 w-full" />

        <!-- Hourly weather -->
        <div class="max-w-screen-md w-full py-12">
            <div class="mx-4">
                <h2 class="mb-4">Hourly Weather</h2>
                <div class="flex gap-10 overflow-x-scroll">
                    <div v-for="hourData in weatherData.hourly" :key="hourData.dt" class="flex flex-col gap-4 items-center">
                        <p class="whitespace-nowrap text-md">
                            {{ new Date(hourData.currentTime).toLocaleTimeString("en-us", {
                                hour: "numeric",
                            }) }}
                        </p>
                        <img class="w-auto h-[50px] object-cover"
                            :src="`http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`" alt="">
                        <p class="text-lg">
                            {{ Math.round(hourData.temp) }}&deg;
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <hr class="border-white border-opacity-10 w-full" />

        <!-- Hourly weather -->
        <div class="max-w-screen-md w-full py-12">
            <div class="mx-4">
                <h2 class="mb-4">7 Day Forecast</h2>
                <div v-for="day in weatherData.daily" :key="day.dt" class="flex items-center">
                    <p class="flex-1">
                        {{ new Date(day.dt * 1000).toLocaleDateString("en-us", {
                            weekday: "long",
                        }) }}
                    </p>
                    <img class="w-[50px] h-[50px] object-cover"
                        :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`" alt="">
                    <div class="flex gap-2 flex-1 justify-end">
                        <p class="text-sm"><i class="fa-solid fa-arrow-up text-orange-400"></i> {{ Math.round(day.temp.max)
                        }}&deg;</p>
                        <p class="text-sm"><i class="fa-solid fa-arrow-down text-blue-400"></i> {{ Math.round(day.temp.min)
                        }}&deg;</p>
                    </div>
                </div>
            </div>
        </div>

        <button class="flex items-center gap-2  cursor-pointer py-12 duration-150 hover:text-red-500" @click="removeCity">
            <i class="fa-solid fa-trash"></i>
            <p>Remove City</p>
        </button>
    </div>
</template>

<script setup>
import axios from 'axios';
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const getWeatherData = async () => {
    try {
        const weatherData = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${route.query.lat}&lon=${route.query.lng}&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}&units=metric`);

        //calculate current data & time
        const localOffset = new Date().getTimezoneOffset() * 60000;
        const utc = weatherData.data.current.dt * 1000 + localOffset;
        weatherData.data.currentTime = utc + 1000 * weatherData.data.timezone_offset;

        //calculate hourly weather offset
        weatherData.data.hourly.forEach(hour => {
            const utc = hour.dt * 1000 + localOffset;
            hour.currentTime = utc + 1000 * weatherData.data.timezone_offset;
        });

        // flicker delay
        await new Promise((res) => setTimeout(res, 1000));

        return weatherData.data;
    } catch (error) {
        console.log(error);
    }
};

const weatherData = await getWeatherData();

const router = useRouter();
const removeCity = () => {
    const cities = JSON.parse(localStorage.getItem('savedCities'));
    const updatedCities = cities.filter((city) => city.id !== route.query.id);
    localStorage.setItem('savedCities', JSON.stringify(updatedCities));
    router.push({
        name: "home"
    });
};
</script>