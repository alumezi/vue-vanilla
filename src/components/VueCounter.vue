<template>
  <div class="vue-counter">
    <h3>Vue Counter Component</h3>
    <p>Count: {{ count }}</p>
    <div class="button-group">
      <button @click="increment" class="btn btn-increment">Increment</button>
      <button @click="decrement" class="btn btn-decrement">Decrement</button>
      <button @click="reset" class="btn btn-reset">Reset</button>
    </div>

    <!-- Performance Test Child Component -->
    <VueHeavyChild />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { counterStore } from "../stores/counterStore";
import VueHeavyChild from "./VueHeavyChild.vue";

// Use computed to reactively get the count from the store
const count = computed(() => counterStore.getCount());

// Methods that update the store
const increment = () => counterStore.increment();
const decrement = () => counterStore.decrement();
const reset = () => counterStore.reset();
</script>

<style scoped>
.vue-counter {
  padding: 20px;
  border: 2px solid #ff6b6b;
  border-radius: 8px;
  margin: 20px 0;
  background-color: #fff5f5;
}

.vue-counter h3 {
  color: #ff6b6b;
  margin: 0 0 10px 0;
}

.button-group {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: white;
  font-weight: 500;
}

.btn-increment {
  background-color: #42b883;
}

.btn-decrement {
  background-color: #ff6b6b;
}

.btn-reset {
  background-color: #6c757d;
}

.btn:hover {
  opacity: 0.9;
}
</style>
