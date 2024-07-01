<template>
  <button class="px-2 py-1 border-solid border-1 rounded-md"
    :class="[_bgColor, _bgHover, _borderColor, _txtColor, _txtHover]">
    <NuxtLink class="text-center font-semibold" :to="_path">
      {{ _label }}
    </NuxtLink>
  </button>
</template>

<script setup>
const props = defineProps({
  _path: {
    type: String,
    required: false,
    default: '#',
  },
  _label: {
    type: String,
    required: false,
    default: "valider",
  },
  _bgColor: {
    type: String,
    required: false,
    default: "",
  },
  _borderColor: {
    type: String,
    required: false,
    default: "",
  },
  _txtColor: {
    type: String,
    required: false,
    default: "",
  },
  // HOVER
  _bgHover: {
    type: String,
    required: false,
    default: "hover:bg-validation-successHover",
  },
  _txtHover: {
    type: String,
    required: false,
    default: "hover:text-white",
  },
});
</script>
