<script setup lang="ts">
const route = useRoute()
const { data: post } = await useAsyncData(route.path, () => {
  return queryCollection('things').path(route.path).first()
})

useSeoMeta({
  title: post.value?.title,
  description: post.value?.description
})
</script>

<template>
  <div v-if="post" class="flex flex-col lg:flex-row justify-center mx-auto rounded-2xl">
    <div class="max-w-full lg:max-w-[670px] p-4">
        <h1 class="text-4xl lg:text-7xl font-bold mt-8 lead text-pretty">{{ post.title }}</h1>
        <p class="text-base lg:text-m italic">{{ post.description }}</p>
        <br />
        <ContentRenderer :value="post" class="prose" />
    </div>
    </div>
</template>

