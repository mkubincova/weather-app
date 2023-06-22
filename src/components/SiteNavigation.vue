<template>
    <header class="sticky top-0 bg-white shadow-lg z-10">
        <nav class="container max-w-screen-md flex items-center gap-4  py-3">
            <RouterLink :to="{ name: 'home' }" v-if="route.name !== 'home'" aria-label="Back to homepage">
                <i class="fa-solid fa-arrow-left text-xl"></i>
            </RouterLink>

            <div class="flex gap-3 flex-1 justify-end">
                <button aria-label="App information" @click="toggleModal" id="modalToggleIcon"><i
                        class="fa-solid fa-circle-info text-xl hover:text-weather-secondary duration-150 cursor-pointer"></i></button>
                <button aria-label="Save location to homepage" @click="addCity" v-if="route.query.preview"><i
                        class="fa-solid fa-plus text-xl hover:text-weather-secondary duration-150 cursor-pointer"></i></button>
            </div>

            <BaseModal :modalActive="modalActive" @close-modal="toggleModal">
                <div class="text-black">
                    <h1 class="text-2xl mb-1">About:</h1>
                    <p class="mb-4">
                        The Local Weather allows you to track the current and
                        future weather of cities of your choosing.
                    </p>
                    <h2 class="text-2xl">How it works:</h2>
                    <ol class="list-decimal list-inside mb-4">
                        <li>
                            Search for your city by entering the name into the
                            search bar.
                        </li>
                        <li>
                            Select a city within the results, this will take
                            you to the current weather for your selection.
                        </li>
                        <li>
                            Track the city by clicking on the "+" icon in the
                            top right. This will save the city to view at a
                            later time on the home page.
                        </li>
                    </ol>

                    <h2 class="text-2xl">Removing a city</h2>
                    <p>
                        If you no longer wish to track a city, simply select
                        the city within the home page. At the bottom of the
                        page, there will be am option to delete the city.
                    </p>
                </div>
            </BaseModal>
        </nav>
    </header>
</template>

<script setup>
import { RouterLink, routerKey, useRoute, useRouter } from 'vue-router';
import BaseModal from './BaseModal.vue';
import { ref, nextTick } from 'vue';
import { uid } from 'uid';

const savedCities = ref([]);
const route = useRoute();
const router = useRouter();
const modalActive = ref(null);

const toggleModal = async () => {
    modalActive.value = !modalActive.value;

    if (modalActive.value) {
        await nextTick();
        document.getElementById("modalCloseButton").focus();
    } else {
        document.getElementById('modalToggleIcon').focus();
    }
};

const addCity = () => {
    // get saved cities from local storage
    if (localStorage.getItem('savedCities')) {
        savedCities.value = JSON.parse(localStorage.getItem('savedCities'));
    }

    // create object of current city from route
    const locationObj = {
        id: uid(),
        state: route.params.state,
        city: route.params.city,
        country: route.params.country,
        coords: {
            lat: route.query.lat,
            lng: route.query.lng
        }
    };

    // add current city to saved and update local storage
    savedCities.value.push(locationObj);
    localStorage.setItem('savedCities', JSON.stringify(savedCities.value));

    // delete "preview" from route
    let query = Object.assign({}, route.query);
    delete query.preview;
    query.id = locationObj.id;
    router.replace({ query });
};
</script>