# .

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

# Vue.js + React Integration with useSyncExternalStore

This project demonstrates how to share state between Vue.js and React components using `useSyncExternalStore` from React 18+.

## Overview

The integration allows React components to subscribe to Vue.js reactive stores and automatically re-render when the store state changes. This creates a seamless state management experience across both frameworks.

## Architecture

### 1. Vue.js Store Pattern

Each Vue.js store follows this pattern:

```javascript
import { ref, watch } from "vue";

// Reactive state
const state = ref(initialValue);

// Subscribers for external consumers
let subscribers = new Set();

// Notify subscribers when state changes
const notifySubscribers = () => {
  subscribers.forEach((callback) => callback());
};

// Watch for changes
watch(state, notifySubscribers, { deep: true });

// Store API
export const store = {
  // State getters
  getState: () => state.value,

  // Actions
  updateState: (newValue) => {
    state.value = newValue;
  },

  // Required for useSyncExternalStore
  subscribe: (callback) => {
    subscribers.add(callback);
    return () => subscribers.delete(callback);
  },

  getSnapshot: () => state.value,
};
```

### 2. React Integration

React components use `useSyncExternalStore` to subscribe to Vue stores:

```javascript
import React, { useSyncExternalStore } from "react";
import { store } from "./store";

function MyComponent() {
  const state = useSyncExternalStore(
    store.subscribe, // Subscribe function
    store.getSnapshot, // Get current state
    () => null // Server-side fallback
  );

  return <div>{state}</div>;
}
```

### 3. Custom Hooks (Optional)

For cleaner code, create custom hooks:

```javascript
import { useSyncExternalStore } from "react";

export function useVueStore(
  store,
  getSnapshot,
  getServerSnapshot = () => null
) {
  return useSyncExternalStore(store.subscribe, getSnapshot, getServerSnapshot);
}

// Specific hook for a store
export function useCounterStore() {
  return useVueStore(
    counterStore,
    () => counterStore.getSnapshot(),
    () => 0
  );
}
```

## Available Stores

### 1. Counter Store (`src/stores/counterStore.js`)

Simple counter with increment, decrement, and reset actions.

**API:**

- `getCount()` - Get current count
- `increment()` - Increment count
- `decrement()` - Decrement count
- `reset()` - Reset to 0
- `subscribe(callback)` - Subscribe to changes
- `getSnapshot()` - Get current state

### 2. User Store (`src/stores/userStore.js`)

Complex user state with authentication and preferences.

**API:**

- `getUser()` - Get full user object
- `getName()`, `getEmail()`, `getIsLoggedIn()`, `getPreferences()` - Get specific properties
- `login(userData)` - Login user
- `logout()` - Logout user
- `updateName(name)`, `updateEmail(email)` - Update user info
- `toggleTheme()`, `toggleNotifications()` - Toggle preferences
- `subscribe(callback)` - Subscribe to changes
- `getSnapshot()` - Get current state

## Components

### Vue Components

- `VueCounter.vue` - Vue component using the counter store
- `UserProfile.vue` - Vue component using the user store

### React Components

- `ReactCounter.jsx` - React component using useSyncExternalStore directly
- `ReactCounterWithHook.jsx` - React component using custom hook
- `UserProfile.jsx` - React component using the user store

## Usage Examples

### Basic Counter Integration

```javascript
// Vue component
<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { counterStore } from '../stores/counterStore'

const count = computed(() => counterStore.getCount())
const increment = () => counterStore.increment()
</script>
```

```javascript
// React component
import React, { useSyncExternalStore } from "react";
import { counterStore } from "../stores/counterStore";

function ReactCounter() {
  const count = useSyncExternalStore(
    counterStore.subscribe,
    counterStore.getSnapshot,
    () => 0
  );

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => counterStore.increment()}>Increment</button>
    </div>
  );
}
```

### Complex State Integration

```javascript
// React component with user store
function UserProfile() {
  const user = useSyncExternalStore(
    userStore.subscribe,
    userStore.getSnapshot,
    () => ({ name: "", email: "", isLoggedIn: false })
  );

  return (
    <div>
      <p>Name: {user.name}</p>
      <p>Status: {user.isLoggedIn ? "Logged In" : "Logged Out"}</p>
      <button onClick={() => userStore.login({ name: "John" })}>Login</button>
    </div>
  );
}
```

## Benefits

1. **Shared State**: Both Vue and React components share the same state
2. **Real-time Updates**: Changes in one framework immediately reflect in the other
3. **Type Safety**: Can be enhanced with TypeScript
4. **Performance**: Only re-renders when state actually changes
5. **SSR Compatible**: Works with server-side rendering
6. **Framework Agnostic**: Store logic is independent of UI framework

## Best Practices

1. **Immutable Updates**: Always create new objects when updating state
2. **Deep Watching**: Use `{ deep: true }` for complex objects
3. **Cleanup**: Subscriptions are automatically cleaned up by React
4. **Server Fallbacks**: Always provide server-side fallback values
5. **Error Boundaries**: Wrap React components in error boundaries

## Running the Project

```bash
npm install
npm run dev
```

Visit the application to see both Vue and React components sharing state in real-time!
