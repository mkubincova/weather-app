<template>
  <div class="flex flex-col min-h-screen font-Roboto">
    <SiteNavigation />
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
    <footer class="container max-w-screen-md relative">
      <div
        class="py-4 flex flex-col justify-center text-center xs:justify-between xs:flex-row items-center gap-x-2 flex-wrap absolute left-[1rem] right-[1rem] bottom-0">
        <p>Made by Magdaléna Kubincová ©{{ new Date().getFullYear() }}</p>
        <a class="underline underline-offset-2 hover:no-underline focus:no-underline"
          href="https://github.com/mkubincova/weather-app">Source
          code</a>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import SiteNavigation from './components/SiteNavigation.vue';
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: 600ms ease all;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>