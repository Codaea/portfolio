<template>
<div>
        <div class="flex flex-wrap">
            <OsShortcut @click="handleClick(shortcut)" v-for="shortcut in shortcuts" :title="shortcut.title" :imageSrc="shortcut.imageSrc"/>
        </div>
</div>
</template>

<script setup lang="ts">
import type { OsWindow } from '~/types/Window';
import Placeholder from '../Placeholder.vue';
import Blog from '../Blog.vue';

const windows = useState<OsWindow[]>('windows')
interface Shortcut {
    title: string;
    imageSrc: string;
    slot: Component;
}

const shortcuts: Shortcut[] = [
    {
        title: 'Blog',
        imageSrc: 'https://win98icons.alexmeub.com/icons/png/laptop_small-1.png',
        slot: Blog,
    },
    {
        title: 'A really really lonh title that would overflow any other box',
        imageSrc: 'https://win98icons.alexmeub.com/icons/png/cd_drive-2.png',
        slot: Placeholder,
    },
    {
        title: 'Projects',
        imageSrc: '',
        slot: Placeholder,
    }
]

function handleClick(shortcut: Shortcut) {
    console.log('clicked');

    addWindow(shortcut.slot, shortcut.title);
}

    function addWindow(component: Component, title: string) {
        const id = windows.value.length;
        windows.value.push({
            id,
            title,
            slot: markRaw(component),
            posX: 150,
            posY: 150,
            width: 0,
            height: 0,
            zIndex: 0
        });
    }



</script>