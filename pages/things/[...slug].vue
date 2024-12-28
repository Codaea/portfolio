<template>
  <div class="flex justify-center mx-auto rounded-2xl">
    <div class="max-w-[670px] p-4">
      <ContentQuery :path="$route.path" find="one" v-slot="{ data }">
        <h1 class="text-7xl font-bold mt-8 lead font-w95">{{ data.title }}</h1>
        <p class="text-m italic">{{ data.description }}</p>
        <br />
        <ContentRenderer :value="data" class="prose" />
      </ContentQuery>
    </div>
    <div>
      <div v-if="toc && toc.links" class="sticky top-4" >
        <h4 class="text-xl bold">Table of contents</h4>
        <ul class="list-disc pl-6">
          <li v-for="link in toc.links" :key="link.text">
            <a :href="`#${link.id}`">
              {{ link.text }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { toc } = useContent();
</script>
