// Performance measurement utilities for comparing Vue vs React rendering

export class PerformanceMeasurer {
  constructor() {
    this.metrics = {
      vue: [],
      react: []
    };
  }

  // Start measuring render time
  startMeasure(componentType) {
    const startTime = performance.now();
    return {
      componentType,
      startTime,
      end: () => this.endMeasure(componentType, startTime)
    };
  }

  // End measuring and record the time
  endMeasure(componentType, startTime) {
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    this.metrics[componentType].push({
      timestamp: new Date().toISOString(),
      renderTime: renderTime.toFixed(2),
      duration: renderTime
    });

    console.log(`${componentType.toUpperCase()} render time: ${renderTime.toFixed(2)}ms`);
    return renderTime;
  }

  // Get average render time for a component type
  getAverageRenderTime(componentType) {
    const times = this.metrics[componentType];
    if (times.length === 0) return 0;
    
    const total = times.reduce((sum, metric) => sum + metric.duration, 0);
    return (total / times.length).toFixed(2);
  }

  // Get all metrics
  getMetrics() {
    return {
      vue: {
        measurements: this.metrics.vue,
        average: this.getAverageRenderTime('vue'),
        count: this.metrics.vue.length
      },
      react: {
        measurements: this.metrics.react,
        average: this.getAverageRenderTime('react'),
        count: this.metrics.react.length
      }
    };
  }

  // Clear all metrics
  clear() {
    this.metrics.vue = [];
    this.metrics.react = [];
  }

  // Print comparison report
  printReport() {
    const metrics = this.getMetrics();
    console.log('=== Performance Comparison Report ===');
    console.log(`Vue.js - Average: ${metrics.vue.average}ms (${metrics.vue.count} measurements)`);
    console.log(`React - Average: ${metrics.react.average}ms (${metrics.react.count} measurements)`);
    
    if (metrics.vue.average > 0 && metrics.react.average > 0) {
      const difference = (metrics.vue.average - metrics.react.average).toFixed(2);
      const faster = metrics.vue.average < metrics.react.average ? 'Vue.js' : 'React';
      console.log(`${faster} is faster by ${Math.abs(difference)}ms`);
    }
    console.log('=====================================');
  }
}

// Global instance
export const performanceMeasurer = new PerformanceMeasurer();

// Vue composition function for measuring performance
export function usePerformanceMeasure(componentType) {
  const startMeasure = () => {
    const measure = performanceMeasurer.startMeasure(componentType);
    return measure.end;
  };

  return { startMeasure };
}

// React hook for measuring performance
export function useReactPerformanceMeasure(componentType) {
  const startMeasure = () => {
    const measure = performanceMeasurer.startMeasure(componentType);
    return measure.end;
  };

  return { startMeasure };
} 