<template>
    <Teleport to="body">
        <Transition name="modal-outer">
            <div v-show="modalActive"
                class="fixed inset-0 z-50 bg-black bg-opacity-30 flex justify-center items-center p-4">
                <div @click="$emit('close-modal')" class="fixed inset-0 -z-10"></div>
                <Transition name="modal-inner">
                    <div v-if="modalActive"
                        class="p-4 bg-white max-w-screen-md max-h-[calc(100vh-2rem)] overflow-y-auto rounded-md">
                        <slot />
                        <button class=" mt-8 bg-black text-white py-2 px-6 rounded-sm"
                            @click="$emit('close-modal')">Close</button>
                    </div>
                </Transition>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
defineProps({
    modalActive: {
        type: Boolean,
        default: false,
    }
});
defineEmits(["close-modal"]);
</script>

<style scoped>
.modal-outer-enter-active,
.modal-outer-leave-active {
    transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-outer-enter-from,
.modal-outer-leave-to {
    opacity: 0;
}

.modal-inner-enter-active {
    transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-inner-leave-active {
    transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-inner-enter-from {
    opacity: 0;
    transform: scale(0.8);
}

.modal-inner-leave-to {
    transform: scale(0.8);
}
</style>