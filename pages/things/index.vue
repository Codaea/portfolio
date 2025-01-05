<template>
    <div class="">
        <h1 class="text-8xl p-5">Things I've Made</h1>
        <div v-if="posts" class="space-y-5">
            <div v-for="post in posts" :key="post._path">
                <div class="">
                    <span class="text-5xl">
                        - 
                        <NuxtLink :to="post._path"  class="underline">{{ post.title }}</NuxtLink></span>
                    <p class="text-2xl text-gray-600">{{ post.description }}</p>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    title: 'Blog',
})

const { data: posts } = await useAsyncData('home', () => queryContent('/things').find());
</script>