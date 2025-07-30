import React, { useSyncExternalStore } from 'react'
import { counterStore } from '../stores/counterStore'
import ReactAGGrid from './ReactAGGrid.jsx'

function ReactCounter() {
  // Use useSyncExternalStore to subscribe to the Vue.js store
  const count = useSyncExternalStore(
    counterStore.subscribe,
    counterStore.getSnapshot,
    () => 0 // Server-side fallback
  )

  return (
    <div style={{ 
      padding: '20px', 
      border: '2px solid #42b883', 
      borderRadius: '8px', 
      margin: '20px 0',
      backgroundColor: '#f8f9fa'
    }}>
      <h3 style={{ color: '#42b883', margin: '0 0 10px 0' }}>React Counter Component (Vue Store)</h3>
      <p>Count: {count}</p>
      <p style={{ fontSize: '0.9em', color: '#666', marginBottom: '15px' }}>
        This React component is subscribed to the Vue.js store using useSyncExternalStore
      </p>
      <button 
        onClick={() => counterStore.increment()}
        style={{
          backgroundColor: '#42b883',
          color: 'white',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '4px',
          cursor: 'pointer',
          marginRight: '8px'
        }}
      >
        Increment
      </button>
      <button 
        onClick={() => counterStore.decrement()}
        style={{
          backgroundColor: '#ff6b6b',
          color: 'white',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '4px',
          cursor: 'pointer',
          marginRight: '8px'
        }}
      >
        Decrement
      </button>
      <button 
        onClick={() => counterStore.reset()}
        style={{
          backgroundColor: '#6c757d',
          color: 'white',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Reset
      </button>
      
      {/* Performance Test AG Grid Component */}
      <ReactAGGrid />
    </div>
  )
}

export default ReactCounter 