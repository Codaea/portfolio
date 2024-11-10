<template>
    <div class="">
        <NuxtLink to="/blog/" class="text-blue-600 underline">Better for your eyes</NuxtLink>
        <h1 class="text-8xl p-5">Blog</h1>
        <div v-if="posts" class="space-y-5">
            <div v-for="post in posts" :key="post._path">
                <div class="">
                    <span class="text-5xl">
                        -
                        <span @click="handleClick(post)" class="underline hover:cursor-pointer">{{ post.title
                            }}</span></span>
                    <p class="text-2xl text-gray-600">{{ post.description }}</p>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content';
import type { OsWindow } from '~/types/Window';
import ContentPage from './ContentPage.vue';

const windows = useState<OsWindow[]>('windows');

const { data: posts } = await useAsyncData('home', () => queryContent('/blog').find());

function handleClick(post: ParsedContent) {
    console.log('clack')
    const WrappedContentPage = defineComponent({
        setup() {
            return () => h(ContentPage, {path: post._path || ''});
        }
    })
    addWindow(WrappedContentPage, post.title?.toString() || '');
}

function addWindow(component: Component, title: string) {
    const id = windows.value.length;
    windows.value.push({
        id,
        title,
        slot: markRaw(component),
        posX: 150,
        posY: 150,
        width: 600,
        height: 700,
        zIndex: 0
    });
    console.log(windows);
}

</script>