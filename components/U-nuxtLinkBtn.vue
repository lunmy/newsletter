<template>
  <button
    class="px-2 py-1 border-solid border-2 rounded-md"
    :class="[_bgColor, _bgHover, _borderColor]"
  >
    <!-- todo change color when button is hover instead of text -->
    <NuxtLink
      class="text-center font-semibold"
      :class="[_txtColor, _txtHover]"
      to="/home"
    >
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
