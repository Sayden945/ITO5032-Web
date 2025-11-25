<script setup>
import NavHeader from './components/NavHeader.vue'
</script>

<template>
  <div class="main-container">
    <header>
      <NavHeader />
    </header>

    <main class="main-box">
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped></style>
