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
import { watch } from 'vue';
// LEFTOFF: 1:00:00 need to design pages inside of the windows component, need to provide a /blog route for if someone wants to not use the cool web os, as well as a standard alternative site. 
// should design a taskbar too (clock in bottom corner?)
// Icons/assets needed rn. Done with pixel art
/*
- [ ] Background
- [ ] Icons for desktop shortcuts (little arrow, folder, etc)
- [ ] Icons for taskbar (start menu, clock)
- [ ] Icons for windows (close, minimize, maximize, resizer bottom right)
- [ ] contact me (email icon, linkedin icon, github icon) (all pixel art/icon)
- [X] font 

*/

const windows = useState<OsWindow[]>('windows', () => [])

function closeWindow(id: number) {
    windows.value = windows.value.filter(window => window.id !== id);
}

</script>

