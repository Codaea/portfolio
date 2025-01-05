<template>
  <div>
    <div class="p-32 h-96 flex flex-row justify-center">
      <div class="text-center">
        <h1 class="text-8xl">Hi, I'm Dakota</h1>
        <p class="text-2xl">I Make Things</p>
      </div>
    </div>
    <div class="space-y-4 m-4">
      <h2 class="text-6xl">Things I've Made</h2>
      <div v-for="post of data" class="flex flex-col space-x-4 w-full">
        <div
          class="w-1/4 min-w-64 p-4 bg-[#bac0ca] border-4 border-t-gray-100 border-l-gray-100 border-r-gray-600 border-b-gray-600 focus:border-black focus:border-t-2 focus:border-l-2"
        >
          <NuxtLink :to="post._path">
            <img class="rounded-md drop-shadow-lg" :src="post.image" />
          </NuxtLink>
          <NuxtLink :to="post._path" class="text-xl">
            {{ post.title }}</NuxtLink
          >
          <p class="italic">{{ post.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'Home',
})
const { data } = useAsyncData('things', () =>
  queryContent('/things').limit(3).sort({ date: 1, $numeric: true }).find()
);
</script>
