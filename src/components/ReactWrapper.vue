<template>
  <div ref="preactContainer"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { render, h } from "preact";

const props = defineProps({
  component: {
    type: Object,
    required: true,
  },
  props: {
    type: Object,
    default: () => ({}),
  },
});

const preactContainer = ref(null);

onMounted(() => {
  if (preactContainer.value) {
    render(h(props.component, props.props), preactContainer.value);
  }
});

onUnmounted(() => {
  if (preactContainer.value) {
    render(null, preactContainer.value);
  }
});
</script>
