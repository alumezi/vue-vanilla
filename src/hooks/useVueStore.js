import { useSyncExternalStore } from 'react'

/**
 * Custom hook to subscribe React components to Vue.js stores
 * @param {Object} store - Vue store with subscribe and getSnapshot methods
 * @param {Function} getSnapshot - Function to get current state snapshot
 * @param {Function} getServerSnapshot - Function for server-side rendering fallback
 * @returns {any} Current state from the store
 */
export function useVueStore(store, getSnapshot, getServerSnapshot = () => null) {
  return useSyncExternalStore(
    store.subscribe,
    getSnapshot,
    getServerSnapshot
  )
}

/**
 * Hook specifically for the counter store
 * @returns {number} Current count value
 */
export function useCounterStore() {
  return useVueStore(
    counterStore,
    () => counterStore.getSnapshot(),
    () => 0
  )
}

// Import the counter store for the specific hook
import { counterStore } from '../stores/counterStore' 