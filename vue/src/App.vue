<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import MainMenu from './components/MainMenu.vue';
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <MainMenu />
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
</style>
