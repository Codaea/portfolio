<template>
    <div class="absolute z-10 bg-slate-400 h-[500px]" :style="{ top: posY + 'px', left: posX + 'px', }">
        <div class="h-full w-full border-t-2 border-t-gray-400 border-l-2 border-l-gray-100 border-b-4 border-b-gray-600 border-r-4 border-r-gray-600 flex flex-col">
            <!-- Header -->
            <div ref="header" class="flex h-8 w-full bg-blue-800 cursor-move z-20 pl-2 flex-shrink-0"
                @mousedown="startDrag">
                <span class="flex-grow text-white text-ellipsis overflow-hidden whitespace-nowrap">{{ window?.title }}</span>
                <span class="ml-2 cursor-pointer" @click="emit('close', props.window?.id)">X</span>
            </div>
            <!-- Scrollable Content -->
            <div class="flex-1 overflow-y-auto m-5">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

interface Window {
    id: number;
    title: string;
    slot: Component;
    posX: number;
    posY: number;
    width: number;
    height: number;
    zIndex: number;
}

const props = defineProps({
    window: Object as PropType<Window>,
})

const emit = defineEmits(['close']);


// get inital heigh requested
const posX = ref(props.window?.posX || 0);
const posY = ref(props.window?.posY || 0);
const isDragging = ref(false);
const offsetX = ref(0);
const offsetY = ref(0);


function startDrag(e: MouseEvent) {
    isDragging.value = true;
    offsetX.value = e.clientX - posX.value;
    offsetY.value = e.clientY - posY.value;
    document.addEventListener('mousemove', dragEl);
    document.addEventListener('mouseup', stopDrag); // stop resizing even if mouse leaves window
}

function stopDrag() {
    isDragging.value = false;
    document.removeEventListener('mousemove', dragEl);
    document.removeEventListener('mouseup', stopDrag);
}

function dragEl(e: MouseEvent) {
    if (isDragging.value) {
        posX.value = e.clientX - offsetX.value;
        posY.value = e.clientY - offsetY.value;
    }
}

/*
// Dragging Removed Until I can figure out how to make it work with resizing min width/height to handle slot content

// get inital width requested
const width = ref(props.window?.width || 300);
const height = ref(props.window?.height || 300);
const isResizing = ref(false);


function startResize(e: MouseEvent) {
    isResizing.value = true;
    document.addEventListener('mousemove', resizeEl);
    document.addEventListener('mouseup', stopResize); }

function stopResize() {
    isResizing.value = false;
    document.removeEventListener('mousemove', resizeEl);
    document.removeEventListener('mouseup', stopResize);
}

function resizeEl(e: MouseEvent) {
    if (isResizing.value) {
        width.value = e.clientX - posX.value + 5; // +5 to account for border width, realigns the border to the mouse
        height.value = e.clientY - posY.value + 5;
    }
}
    
*/

</script>
