import { ref, watch } from 'vue'

// Create a reactive counter store
const count = ref(0)

// Store subscribers for external consumers (like React)
let subscribers = new Set()

// Function to notify all subscribers
const notifySubscribers = () => {
  subscribers.forEach(callback => callback())
}

// Watch for changes and notify subscribers
watch(count, () => {
  notifySubscribers()
})

// Store API
export const counterStore = {
  // Get current count
  getCount: () => count.value,
  
  // Increment count
  increment: () => {
    count.value++
  },
  
  // Decrement count
  decrement: () => {
    count.value--
  },
  
  // Reset count
  reset: () => {
    count.value = 0
  },
  
  // Subscribe to changes (for useSyncExternalStore)
  subscribe: (callback) => {
    subscribers.add(callback)
    return () => {
      subscribers.delete(callback)
    }
  },
  
  // Get snapshot (for useSyncExternalStore)
  getSnapshot: () => count.value
} 