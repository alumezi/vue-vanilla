<script setup>
import HelloWorld from "./components/HelloWorld.vue";
import TheWelcome from "./components/TheWelcome.vue";
import ReactWrapper from "./components/ReactWrapper.vue";
import ReactCounter from "./react-components/ReactCounter.jsx";
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

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header>

  <main>
    <TheWelcome />

    <!-- React Component Integration -->
    <section class="react-section">
      <h2>React Component in Vue</h2>
      <ReactWrapper :component="ReactCounter" />
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

.react-section {
  margin: 2rem 0;
  padding: 1rem;
  border-top: 2px solid #42b883;
}

.react-section h2 {
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
