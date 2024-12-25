<template>

    <div class="flex justify-center mx-auto max-w-3/4 min-w-16   rounded-2xl">
        <div class="p-8">
          <ContentQuery :path="$route.path" find="one" v-slot="{ data }">
            <h1 class="text-8xl font-bold mt-8 lead">{{ data.title }}</h1>
            <p class="text-m italic"> {{ data.description }}</p>
            <br>
            <ContentRenderer :value="data" class="prose" />
          </ContentQuery>
        </div>
      </div>

</template>

<script setup lang="ts">
definePageMeta({
    layout: 'window',
})
</script>