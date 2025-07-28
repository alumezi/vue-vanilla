<script setup>
import HelloWorld from "./components/HelloWorld.vue";
import TheWelcome from "./components/TheWelcome.vue";
import ReactWrapper from "./components/ReactWrapper.vue";
import ReactCounter from "./react-components/ReactCounter.jsx";
import VueCounter from "./components/VueCounter.vue";
</script>

<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="./assets/logo.svg"
      width="125"
      height="125"
    />
  </header>

  <main>
    <!-- Shared State Demo -->
    <section class="shared-state-section">
      <h2>Shared State Between Vue and React</h2>
      <p class="description">
        Both components are connected to the same Vue.js store. Changes in one
        component will update the other in real-time!
      </p>

      <!-- Vue Counter Component -->
      <VueCounter />

      <!-- React Counter Component -->
      <div class="react-section">
        <h3>React Component</h3>
        <ReactWrapper :component="ReactCounter" />
      </div>
    </section>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.shared-state-section {
  margin: 2rem 0;
  padding: 1rem;
  border-top: 2px solid #42b883;
}

.shared-state-section h2 {
  color: #42b883;
  margin-bottom: 0.5rem;
}

.description {
  color: #666;
  margin-bottom: 2rem;
  font-style: italic;
}

.react-section {
  margin: 1rem 0;
}

.react-section h3 {
  color: #42b883;
  margin-bottom: 1rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
