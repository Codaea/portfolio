<template>
        <NuxtLink :to="path" target="_blank" class="text-blue-600 underline">View in browser</NuxtLink>
    <div class="">
    <ContentQuery :path="path" find="one" v-slot="{ data }">
            <h1 class="text-8xl font-bold mt-8 lead">{{ data.title }}</h1>
            <p class="text-m italic"> {{ data.description }}</p>
            <br>
            <ContentRenderer :value="data" class="prose" />
          </ContentQuery>
</div>
</template>

<script setup lang="ts">
const props = defineProps({
    path: {
        type: String,
        required: true
    }
})
</script>