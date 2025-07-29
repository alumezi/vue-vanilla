<template>
  <div class="vue-heavy-child">
    <h4>Vue Heavy Child Component</h4>
    <p>
      This component contains {{ nodeCount }} DOM nodes for performance testing
    </p>
    <p v-if="renderTime" class="performance-info">
      Last render time: {{ renderTime }}ms
    </p>

    <!-- Generate many nested divs with different content -->
    <div class="node-container">
      <div v-for="i in 50" :key="i" class="node-row">
        <div v-for="j in 10" :key="`${i}-${j}`" class="node-item">
          <span class="node-number">{{ i * j }}</span>
          <div class="node-content">
            <div class="nested-level-1">
              <div class="nested-level-2">
                <div class="nested-level-3">
                  <span class="nested-text">Node {{ i }}-{{ j }}</span>
                  <div class="nested-details">
                    <span class="detail-item">ID: {{ i * 1000 + j }}</span>
                    <span class="detail-item"
                      >Type:
                      {{
                        (i + j) % 3 === 0
                          ? "Primary"
                          : (i + j) % 3 === 1
                          ? "Secondary"
                          : "Tertiary"
                      }}</span
                    >
                    <span class="detail-item"
                      >Status:
                      {{ (i + j) % 2 === 0 ? "Active" : "Inactive" }}</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, nextTick } from "vue";
import { usePerformanceMeasure } from "../utils/performanceUtils";

// Calculate total number of nodes for display
const nodeCount = computed(() => {
  // 50 rows * 10 items * 8 nested elements per item = 4000 nodes
  return 50 * 10 * 8;
});

const renderTime = ref(null);
const { startMeasure } = usePerformanceMeasure("vue");

onMounted(() => {
  const endMeasure = startMeasure();
  // Use nextTick to measure after DOM is fully rendered
  nextTick(() => {
    renderTime.value = endMeasure();
  });
});
</script>

<style scoped>
.vue-heavy-child {
  margin: 20px 0;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: #fafafa;
}

.vue-heavy-child h4 {
  color: #ff6b6b;
  margin: 0 0 10px 0;
  font-size: 1.1em;
}

.performance-info {
  color: #666;
  font-size: 0.9em;
  margin-bottom: 10px;
  font-style: italic;
}

.node-container {
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #eee;
  border-radius: 4px;
  background-color: white;
}

.node-row {
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
  border-bottom: 1px solid #f0f0f0;
}

.node-row:last-child {
  border-bottom: none;
}

.node-item {
  flex: 1;
  min-width: 120px;
  margin: 2px;
  padding: 8px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background-color: #f8f9fa;
  font-size: 0.8em;
}

.node-number {
  display: block;
  font-weight: bold;
  color: #42b883;
  margin-bottom: 4px;
}

.node-content {
  font-size: 0.7em;
}

.nested-level-1 {
  padding: 2px;
  background-color: #f0f0f0;
  border-radius: 2px;
}

.nested-level-2 {
  padding: 2px;
  background-color: #e8e8e8;
  border-radius: 2px;
}

.nested-level-3 {
  padding: 2px;
  background-color: #e0e0e0;
  border-radius: 2px;
}

.nested-text {
  display: block;
  font-weight: 500;
  color: #333;
  margin-bottom: 2px;
}

.nested-details {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.detail-item {
  font-size: 0.6em;
  color: #666;
  padding: 1px 2px;
  background-color: #f5f5f5;
  border-radius: 1px;
}
</style>
