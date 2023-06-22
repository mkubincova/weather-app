<template>
  <main class="container max-w-screen-md flex-1 pb-[70px]">
    <div class="pt-4 mb-3 relative">
      <input type="text" placeholder="Search for a city or state" v-model="searchQuery" @input="getSearchResults"
        class="w-full py-3 px-2 border-2 rounded-md cursor-pointer text-black">
      <ul class="w-full absolute top-[75px] py-2 bg-white text-black shadow-md rounded-md z-10"
        v-if="mapboxSearchResults">
        <p class="p-2" v-if="searchError">Oops, something went wrong, please try again.</p>
        <p class="p-2" v-if="!searchError && mapboxSearchResults.length === 0">Nothing in here, try a different query.
        </p>
        <template v-else>
          <li v-for="searchResult in mapboxSearchResults" :key="searchResult.id"
            class="p-2 cursor-pointer focus:outline-none hover:bg-black hover:text-white focus:text-white focus:bg-black"
            @click="previewCity(searchResult)" @keydown.enter="previewCity(searchResult)" tabindex="0">
            {{ searchResult.place_name }}</li>
        </template>
      </ul>
    </div>
    <div class="flex flex-col gap-4 py-4">
      <Suspense>
        <CityList />
        <template #fallback>
          <CityCardSkeleton />
        </template>
      </Suspense>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import CityList from '../components/CityList.vue';
import CityCardSkeleton from '../components/CityCardSkeleton.vue';

const router = useRouter();
const searchQuery = ref('');
const queryTimeout = ref(null);
const mapboxSearchResults = ref(null);
const searchError = ref(null);

const getSearchResults = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      try {
        const result = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${import.meta.env.VITE_MAPBOX_API_KEY}&types=place`);
        mapboxSearchResults.value = result.data.features;
      } catch {
        searchError.value = true;
      }

      return;
    }
    mapboxSearchResults.value = null;
  }, 300);
};

const previewCity = (result) => {
  const resultArray = result.place_name.split(",");
  let city, state, country;
  if (resultArray.length >= 3) [city, state, country] = resultArray;
  if (resultArray.length === 2) [city, country] = resultArray;

  router.push({
    name: "cityView",
    params: { country: country.replaceAll(" ", ""), state: state ? state.replaceAll(" ", "") : '', city: city },
    query: {
      lat: result.geometry.coordinates[1],
      lng: result.geometry.coordinates[0],
      preview: true,
    }
  });
};
</script>
