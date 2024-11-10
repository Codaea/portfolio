<template>
    <div>
        <h1 class="text-8xl p-5">Hi, I'm Dakota.</h1>
        <div class="flex items-center space-x-2">
            <p class="text-3xl">A</p>
            <div class="h-8 w-full overflow-hidden mb-2">
                    <div class="animate-scroll">
                        <p class="text-3xl font-bold" v-for="item in items" :key="item">
                            {{ item }}
                        </p>
                    </div>
            </div>
        </div>
        <p>Based In the United States</p>
        <div class="flex justify-end">
            <OsButtonText label="Explore" />
        </div>
    </div>
</template>

<script setup lang="ts">
const items = [
    'Web Developer',
    'Wanna Be Software Engineer',
    'Self Taught Programmer',
    'K.I.S.S. Enthusiast',
]


</script>

<style>
@keyframes scroll {
    0% { transform: translateY(0); }
    20% { transform: translateY(0); }
    25% { transform: translateY(-25%); }
    45% { transform: translateY(-25%); }
    50% { transform: translateY(-50%); }
    70% { transform: translateY(-50%); }
    75% { transform: translateY(-75%); }
    95% { transform: translateY(-75%); }
    100% { transform: translateY(-100%); }
}

.animate-scroll {
    display: inline-block;
    animation: scroll 16s cubic-bezier(0.5, 0, 0.5, 1) infinite;
}
</style>