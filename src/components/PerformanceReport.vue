<template>
  <div class="performance-report">
    <h3>Performance Comparison Report</h3>

    <div class="metrics-container">
      <div class="metric-card vue-metric">
        <h4>Vue.js Performance</h4>
        <div class="metric-value">{{ vueMetrics.average }}ms</div>
        <div class="metric-details">
          <span>Measurements: {{ vueMetrics.count }}</span>
          <span>Total nodes: 4,000</span>
        </div>
      </div>

      <div class="metric-card react-metric">
        <h4>React Performance</h4>
        <div class="metric-value">{{ reactMetrics.average }}ms</div>
        <div class="metric-details">
          <span>Measurements: {{ reactMetrics.count }}</span>
          <span>Total nodes: 4,000</span>
        </div>
      </div>
    </div>

    <div v-if="comparison" class="comparison-result">
      <h4>Performance Winner</h4>
      <div class="winner-badge" :class="comparison.faster">
        {{ comparison.faster === "vue" ? "Vue.js" : "React" }} is faster by
        {{ comparison.difference }}ms
      </div>
    </div>

    <div class="actions">
      <button @click="refreshMetrics" class="btn btn-refresh">
        Refresh Metrics
      </button>
      <button @click="clearMetrics" class="btn btn-clear">Clear All</button>
      <button @click="printReport" class="btn btn-print">
        Print to Console
      </button>
    </div>

    <div class="instructions">
      <h4>How to Test Performance</h4>
      <ol>
        <li>Refresh the page to see initial render times</li>
        <li>Click the counter buttons to trigger re-renders</li>
        <li>Use browser dev tools to measure additional metrics</li>
        <li>Compare the results in the console and UI</li>
      </ol>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { performanceMeasurer } from "../utils/performanceUtils";

const vueMetrics = ref({ average: "0.00", count: 0 });
const reactMetrics = ref({ average: "0.00", count: 0 });

const comparison = computed(() => {
  const vueAvg = parseFloat(vueMetrics.value.average);
  const reactAvg = parseFloat(reactMetrics.value.average);

  if (vueAvg > 0 && reactAvg > 0) {
    const difference = Math.abs(vueAvg - reactAvg).toFixed(2);
    const faster = vueAvg < reactAvg ? "vue" : "react";
    return { faster, difference };
  }
  return null;
});

const refreshMetrics = () => {
  const metrics = performanceMeasurer.getMetrics();
  vueMetrics.value = metrics.vue;
  reactMetrics.value = metrics.react;
};

const clearMetrics = () => {
  performanceMeasurer.clear();
  refreshMetrics();
};

const printReport = () => {
  performanceMeasurer.printReport();
};

onMounted(() => {
  // Refresh metrics every 2 seconds to show real-time updates
  refreshMetrics();
  setInterval(refreshMetrics, 2000);
});
</script>

<style scoped>
.performance-report {
  margin: 2rem 0;
  padding: 1.5rem;
  border: 2px solid #42b883;
  border-radius: 8px;
  background-color: #f8f9fa;
}

.performance-report h3 {
  color: #42b883;
  margin: 0 0 1rem 0;
  text-align: center;
}

.metrics-container {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.metric-card {
  flex: 1;
  padding: 1rem;
  border-radius: 6px;
  text-align: center;
  background-color: white;
  border: 1px solid #ddd;
}

.vue-metric {
  border-left: 4px solid #ff6b6b;
}

.react-metric {
  border-left: 4px solid #42b883;
}

.metric-card h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
}

.metric-value {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.vue-metric .metric-value {
  color: #ff6b6b;
}

.react-metric .metric-value {
  color: #42b883;
}

.metric-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.8em;
  color: #666;
}

.comparison-result {
  text-align: center;
  margin-bottom: 1.5rem;
}

.comparison-result h4 {
  margin: 0 0 0.5rem 0;
  color: #333;
}

.winner-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: bold;
  color: white;
}

.winner-badge.vue {
  background-color: #ff6b6b;
}

.winner-badge.react {
  background-color: #42b883;
}

.actions {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  color: white;
}

.btn-refresh {
  background-color: #42b883;
}

.btn-clear {
  background-color: #6c757d;
}

.btn-print {
  background-color: #17a2b8;
}

.btn:hover {
  opacity: 0.9;
}

.instructions {
  background-color: white;
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid #ddd;
}

.instructions h4 {
  margin: 0 0 0.5rem 0;
  color: #333;
}

.instructions ol {
  margin: 0;
  padding-left: 1.5rem;
}

.instructions li {
  margin-bottom: 0.25rem;
  color: #666;
}

@media (max-width: 768px) {
  .metrics-container {
    flex-direction: column;
  }

  .actions {
    flex-direction: column;
  }
}
</style>
