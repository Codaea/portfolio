<template>
    <div >
        <div class=" p-32 h-96 flex flex-row justify-center">
            <div class="text-center">
            <h1 class="text-8xl">Hi, I'm Dakota</h1>
            <p class="text-2xl">I'm <a class="text-blue-700 underline hover:cursor-pointer" target="_blank" rel="noopener noreferrer" href="https://owl.purdue.edu/owl/general_writing/grammar/articles_a_versus_an.html">a(n)</a> <RollingText /></p>
            </div>
        </div>
        <div class="space-y-4 m-4">
            <h2 class="text-6xl">Things I've Done</h2>
        <div v-for="post in data">
            <div>
                <h2> {{ post.title }}</h2>
                <p> {{ post.description }}</p>
            </div>
        </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    const { data } = useAsyncData('things', () => queryContent('/things').limit(3).find())

</script>