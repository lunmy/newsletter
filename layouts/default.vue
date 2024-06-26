<!-- <script setup>
definePageMeta({

    middleware: ["auth"],
});

console.log('pass through layout');
</script> -->
<template>
    <div>
        <NuxtLink class="mx-5" to="/test">test</NuxtLink>
        <NuxtLink class="mr-5" to="/home">home</NuxtLink>
        <NuxtLink class="mr-5" to="/">login</NuxtLink>
    </div>
    <NuxtPage />

</template>