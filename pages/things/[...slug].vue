<template>
  <div class="flex flex-col lg:flex-row justify-center mx-auto rounded-2xl">
    <div class="max-w-full lg:max-w-[670px] p-4">
        <h1 class="text-4xl lg:text-7xl font-bold mt-8 lead text-pretty">{{ page.title }}</h1>
        <p class="text-base lg:text-m italic">{{ page.description }}</p>
        <br />
        <ContentRenderer :value="page" class="prose" />
    </div>
    <div class="mt-4 lg:mt-0 lg:ml-8">
      <div v-if="toc && toc.links" class="sticky top-4">
        <h4 class="text-lg lg:text-xl bold">Table of contents</h4>
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
const { toc, page } = useContent();
useContentHead(page);
</script>
