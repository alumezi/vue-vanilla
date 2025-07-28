import React from 'react'
import { useCounterStore } from '../hooks/useVueStore'
import { counterStore } from '../stores/counterStore'

function ReactCounterWithHook() {
  // Use the custom hook for cleaner code
  const count = useCounterStore()

  return (
    <div style={{ 
      padding: '20px', 
      border: '2px solid #17a2b8', 
      borderRadius: '8px', 
      margin: '20px 0',
      backgroundColor: '#f0f8ff'
    }}>
      <h3 style={{ color: '#17a2b8', margin: '0 0 10px 0' }}>React Counter (Custom Hook)</h3>
      <p>Count: {count}</p>
      <p style={{ fontSize: '0.9em', color: '#666', marginBottom: '15px' }}>
        This component uses a custom useCounterStore hook for cleaner code
      </p>
      <button 
        onClick={() => counterStore.increment()}
        style={{
          backgroundColor: '#17a2b8',
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
          backgroundColor: '#dc3545',
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
    </div>
  )
}

export default ReactCounterWithHook 