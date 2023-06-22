<template>
    <div class="flex flex-col flex-1 items-center pb-[70px]"
        :class="[sunIcons.includes(weatherData.current.weather[0].icon) ? 'bg-sun' : cloudIcons.includes(weatherData.current.weather[0].icon) ? 'bg-cloud' : rainIcons.includes(weatherData.current.weather[0].icon) ? 'bg-rain' : 'bg-night text-white']">
        <!-- Banner -->
        <div v-if="route.query.preview" class="p-4 bg-black bg-opacity-20 shadow-inner w-full text-center">
            <p class="text-sm">You are currently previewing this city, click on the "+" icon to save it.</p>
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
                        hour: "numeric",
                        minute: "2-digit"
                    }) }}</p>
                    <p class="text-sm opacity-70">UTC{{ weatherData.timezone_offset > 0 ? '+' : '' }}{{
                        weatherData.timezone_offset !== 0 ?
                        weatherData.timezone_offset / 60 / 60 : "" }}</p>
                </div>
            </div>

            <div class="flex gap-2 mt-8 card">
                <div class="flex-1 flex flex-col">
                    <p class="text-7xl mb-2">
                        {{ Math.round(weatherData.current.temp) }}&deg;
                    </p>
                    <div class="flex gap-2">
                        <span class="text-sm"><i class="fa-solid fa-arrow-up text-red-500"></i> {{
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


            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
                <div class="card-sm flex flex-col items-center gap-1">
                    <i class="fa-solid fa-circle text-[#EC6E4C] text-2xl"></i>
                    <span class="text-sm opacity-70">Sunrise</span>
                    <span class="text-lg">{{ new Date(getLocalDateTime(weatherData.current.sunrise,
                        weatherData.timezone_offset)).toLocaleString("en-gb", {
                            hour: "numeric",
                            minute: "2-digit"
                        }) }} </span>
                </div>
                <div class="card-sm flex flex-col items-center gap-1">
                    <i class="fa-solid fa-circle text-[#49484A] text-2xl"></i>
                    <span class="text-sm opacity-70">Sunset</span>
                    <span class="text-lg">{{ new Date(getLocalDateTime(weatherData.current.sunset,
                        weatherData.timezone_offset)).toLocaleString("en-gb", {
                            hour: "numeric",
                            minute: "2-digit"
                        }) }}</span>
                </div>
                <div class="card-sm flex flex-col items-center gap-1">
                    <i class="fa-solid fa-droplet text-blue-400 text-2xl"></i>
                    <span class="text-sm opacity-70">Humidity</span>
                    <span class="text-lg">{{ weatherData.current.humidity }}%</span>
                </div>
                <div class="card-sm flex flex-col items-center gap-1">
                    <i class="fa-solid fa-wind text-white text-2xl"></i>
                    <span class="text-sm opacity-70">Wind Speed</span>
                    <span class="text-lg">{{ Math.round((weatherData.current.wind_speed * 3.6 + Number.EPSILON) * 100) / 100
                    }} km/h</span>
                </div>
            </div>
        </div>


        <!-- Hourly weather -->
        <div class="max-w-screen-md w-full pt-8 pb-4">
            <div class="mx-4">
                <div class="flex justify-between items-end mb-4">
                    <h2 class="text-xl">Hourly Forecast</h2>
                    <p class="opacity-70 text-sm">48 hours</p>
                </div>

                <div class="flex gap-2 overflow-x-scroll pb-4">
                    <div v-for="hourData in weatherData.hourly" :key="hourData.dt"
                        class="flex flex-col items-center min-w-[70px] card py-2">
                        <p class="whitespace-nowrap text-sm opacity-70">
                            {{ new Date(hourData.currentTime).toLocaleTimeString("en-gb", {
                                hour: "numeric",
                                minute: "2-digit"
                            }) }}
                        </p>
                        <img class="w-auto h-[50px] object-contain"
                            :src="`http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`" alt="">
                        <p>
                            {{ Math.round(hourData.temp) }}&deg;
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Daily weather -->
        <div class="max-w-screen-md w-full py-8">
            <div class="mx-4">
                <div class="flex justify-between items-end mb-4">
                    <h2 class="text-xl">Daily Forecast</h2>
                    <p class="opacity-70 text-sm">7 days</p>
                </div>
                <div class="card py-1">
                    <div v-for="day in weatherData.daily" :key="day.dt"
                        class="flex items-center border-b border-white/30 last:border-none">
                        <p class="flex-1">
                            {{ new Date(day.dt * 1000).toLocaleDateString("en-us", {
                                weekday: "long",
                            }) }}
                        </p>
                        <img class="w-[50px] h-[50px] object-cover"
                            :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`" alt="">
                        <div class="flex gap-2 flex-1 justify-end">
                            <p><i class="fa-solid fa-arrow-up text-red-500"></i> {{
                                Math.round(day.temp.max)
                            }}&deg;</p>
                            <p><i class="fa-solid fa-arrow-down text-blue-400"></i> {{
                                Math.round(day.temp.min)
                            }}&deg;</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="py-8" v-if="!route.query.preview">
            <button class="flex items-center gap-2 button bg-red-500" @click="removeCity">
                <i class="fa-solid fa-trash"></i>
                <p>Remove City</p>
            </button>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { useRoute, useRouter } from "vue-router";

const route = useRoute();

const getLocalDateTime = (unixTimestamp, timezoneOffset) => {
    const localOffset = new Date().getTimezoneOffset() * 60000;
    const utc = unixTimestamp * 1000 + localOffset;
    return utc + 1000 * timezoneOffset;
};

const getWeatherData = async () => {
    try {
        const weatherData = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${route.query.lat}&lon=${route.query.lng}&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}&units=metric`);

        // adjust current date & time
        weatherData.data.currentTime = getLocalDateTime(weatherData.data.current.dt, weatherData.data.timezone_offset);

        // adjust hourly weather time
        weatherData.data.hourly.forEach(hour => {
            hour.currentTime = getLocalDateTime(hour.dt, weatherData.data.timezone_offset);
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