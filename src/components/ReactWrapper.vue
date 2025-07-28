<template>
  <div ref="reactContainer"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import React from "react";
import ReactDOM from "react-dom/client";

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

const reactContainer = ref(null);
let root = null;

onMounted(() => {
  if (reactContainer.value) {
    root = ReactDOM.createRoot(reactContainer.value);
    root.render(React.createElement(props.component, props.props));
  }
});

onUnmounted(() => {
  if (root) {
    root.unmount();
  }
});
</script>
