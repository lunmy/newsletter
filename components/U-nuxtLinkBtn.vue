<template>
  <button
    class="px-2 py-1 rounded-md"
    :class="{
      _bgColor: _bgColor == '' ? 'bg-validation-success' : _bgColor,
    }"
  >
    <!-- _bgHover:
    _bgHover != '' ? 'hover:bg-validation-successHover' : (_bgHover = ''), -->
    <NuxtLink class="text-center text-white font-semibold" to="/home">
      {{ _label }}
    </NuxtLink>
  </button>
</template>
<script setup>
const _bgColor = ref("");
const _bgHover = ref("");
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
  // _bgHover: {
  //   type: String,
  //   required: false,
  //   default: " hover:bg-validation-successHover",
  // },
});
</script>
