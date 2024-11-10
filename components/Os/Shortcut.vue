<template>
    <div @click="" class="items-center w-[5.6rem] h-fit p-2 hover:cursor-pointer">
        <div class="w-full h-full relative p-2">
            <img class="absolute bottom-0 left-0 w-4" src="public/os/shortcut.png"/> <!-- TODO: make own version, this is CC.-->
            <img class="w-full object-cover" :src="imageSrc" />
        </div>
        <p class="line-clamp-2 text-center">
            {{ title }}
        </p>
    </div>
</template>

<script setup lang="ts">

const props = defineProps({
    imageSrc: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    }
})

function handleClick() {
    console.log('click TODO: open window');
}

</script>
