<template>
    <button class="group inline-flex items-center
    w-fit h-fit p-1 bg-[#bac0ca]
    border-4 border-t-gray-100
    border-l-gray-100
    border-r-gray-600
    border-b-gray-600
    focus:border-black
    focus:border-t-2
    focus:border-l-2
    ">
        <div class="group-focus:border group-focus:border-black p-0.5 pt-0 pb-1 border-dotted inline-flex items-center gap-2">
            <p>{{ label }}</p>
        </div>
    </button>
</template>

<script setup lang="ts">

const props = defineProps({
    label: String,
});

</script>