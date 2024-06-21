<template>
  <button class="px-2 py-1 rounded-md" :class="[_bgColor, _bgHover]">
    <NuxtLink class="text-center text-white font-semibold" to="/home">
      {{ _label }}
    </NuxtLink>
  </button>
</template>
<script setup>
const props = defineProps({
  _label: {
    type: String,
    required: false,
    default: "valider",
  },
  _bgColor: {
    type: String,
    required: false,
    default: "bg-validation-success",
  },
  _bgHover: {
    type: String,
    required: false,
    default: "hover:bg-validation-successHover",
  },
});
</script>
