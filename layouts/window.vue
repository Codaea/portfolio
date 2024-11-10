<template>
    <div v-if="!route.path.startsWith('/os')">    
        <div class="min-h-screen border-[12px] border-t-gray-100 border-l-gray-100 border-b-gray-600 border-r-gray-600">
        <div class="w-full h-16 bg-blue-800"></div>
        <div class="p-12"> 
            <slot />
        </div>
    </div>
</div>


</template>

<script setup lang="ts">
const route = useRoute();
</script>