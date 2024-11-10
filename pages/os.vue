<template>
    <div class="bg-gray-800 text-white">
        <OsTaskbar />
    <div class="min-w-screen min-h-screen">
        <div v-for="window in windows" :key="window.id">
        <OsWindow :window="window" @close="closeWindow" >
            <component :is="window.slot" />
        </OsWindow>
        </div>
        <OsDesktop />
    </div>
    </div>
</template>

<script setup lang="ts">
import type { OsWindow } from '~/types/Window';
import { markRaw } from 'vue';
import Greeting from '~/components/Greeting.vue';
// Icons/assets needed rn. Done with pixel art
/*
- [ ] Background
- [ ] Icons for desktop shortcuts (little arrow shortcut, back button, folder, etc)
- [ ] Icons for taskbar (start menu, clock)
- [ ] Icons for windows (close, minimize, maximize, resizer bottom right)
- [ ] contact me (email icon, linkedin icon, github icon) (all pixel art/icon)
- [X] font 

*/
const rawGreeting = markRaw(Greeting);

const windows = useState<OsWindow[]>('windows', () => [])

function closeWindow(id: number) {
    windows.value = windows.value.filter(window => window.id !== id);
}

onMounted(() => {
    const docWidth = document.documentElement.clientWidth;
    const docHeight = document.documentElement.clientHeight;
    windows.value.push({
    id: 1,
    title: 'Welcome',
    'slot': rawGreeting,
    posX: docWidth / 2 - 200,
    posY: docHeight / 2 - 200,
    width: 700,
    height: 350,
    zIndex: 1
})
})
</script>

