import { ref, watch } from 'vue'

// Create reactive user state
const user = ref({
  name: 'John Doe',
  email: 'john@example.com',
  isLoggedIn: false,
  preferences: {
    theme: 'light',
    notifications: true
  }
})

// Store subscribers for external consumers (like React)
let subscribers = new Set()

// Function to notify all subscribers
const notifySubscribers = () => {
  subscribers.forEach(callback => callback())
}

// Watch for changes and notify subscribers
watch(user, () => {
  notifySubscribers()
}, { deep: true })

// Store API
export const userStore = {
  // Get current user state
  getUser: () => user.value,
  
  // Get specific user property
  getName: () => user.value.name,
  getEmail: () => user.value.email,
  getIsLoggedIn: () => user.value.isLoggedIn,
  getPreferences: () => user.value.preferences,
  
  // Update user actions
  login: (userData) => {
    user.value = {
      ...user.value,
      ...userData,
      isLoggedIn: true
    }
  },
  
  logout: () => {
    user.value = {
      name: '',
      email: '',
      isLoggedIn: false,
      preferences: {
        theme: 'light',
        notifications: true
      }
    }
  },
  
  updateName: (name) => {
    user.value.name = name
  },
  
  updateEmail: (email) => {
    user.value.email = email
  },
  
  updatePreferences: (preferences) => {
    user.value.preferences = {
      ...user.value.preferences,
      ...preferences
    }
  },
  
  toggleTheme: () => {
    user.value.preferences.theme = 
      user.value.preferences.theme === 'light' ? 'dark' : 'light'
  },
  
  toggleNotifications: () => {
    user.value.preferences.notifications = !user.value.preferences.notifications
  },
  
  // Subscribe to changes (for useSyncExternalStore)
  subscribe: (callback) => {
    subscribers.add(callback)
    return () => {
      subscribers.delete(callback)
    }
  },
  
  // Get snapshot (for useSyncExternalStore)
  getSnapshot: () => user.value
} 