import React, { useSyncExternalStore } from 'react'
import { userStore } from '../stores/userStore'

function UserProfile() {
  // Use useSyncExternalStore to subscribe to the Vue.js user store
  const user = useSyncExternalStore(
    userStore.subscribe,
    userStore.getSnapshot,
    () => ({
      name: '',
      email: '',
      isLoggedIn: false,
      preferences: { theme: 'light', notifications: true }
    })
  )

  return (
    <div style={{ 
      padding: '20px', 
      border: '2px solid #28a745', 
      borderRadius: '8px', 
      margin: '20px 0',
      backgroundColor: '#f8fff9'
    }}>
      <h3 style={{ color: '#28a745', margin: '0 0 15px 0' }}>User Profile (React + Vue Store)</h3>
      
      <div style={{ marginBottom: '15px' }}>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Status:</strong> {user.isLoggedIn ? '🟢 Logged In' : '🔴 Logged Out'}</p>
        <p><strong>Theme:</strong> {user.preferences.theme}</p>
        <p><strong>Notifications:</strong> {user.preferences.notifications ? '🔔 On' : '🔕 Off'}</p>
      </div>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <button 
          onClick={() => userStore.login({ name: 'Jane Smith', email: 'jane@example.com' })}
          style={{
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Login
        </button>
        
        <button 
          onClick={() => userStore.logout()}
          style={{
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
        
        <button 
          onClick={() => userStore.updateName('Updated Name')}
          style={{
            backgroundColor: '#17a2b8',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Update Name
        </button>
        
        <button 
          onClick={() => userStore.toggleTheme()}
          style={{
            backgroundColor: '#6f42c1',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Toggle Theme
        </button>
        
        <button 
          onClick={() => userStore.toggleNotifications()}
          style={{
            backgroundColor: '#fd7e14',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Toggle Notifications
        </button>
      </div>
    </div>
  )
}

export default UserProfile 