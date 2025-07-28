import React, { useState } from 'react'

function ReactCounter() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ 
      padding: '20px', 
      border: '2px solid #42b883', 
      borderRadius: '8px', 
      margin: '20px 0',
      backgroundColor: '#f8f9fa'
    }}>
      <h3 style={{ color: '#42b883', margin: '0 0 10px 0' }}>React Counter Component</h3>
      <p>Count: {count}</p>
      <button 
        onClick={() => setCount(count + 1)}
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
        onClick={() => setCount(count - 1)}
        style={{
          backgroundColor: '#ff6b6b',
          color: 'white',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Decrement
      </button>
    </div>
  )
}

export default ReactCounter 