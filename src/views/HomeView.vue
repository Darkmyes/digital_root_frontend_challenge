<script setup lang="ts">
  import SearchForm from '../components/SearchForm.vue'
</script>

<template>
  <main class="pa-4 pa-sm-8">
    <div class="mb-4 text-center d-flex flex-column align-center justify-center text-secondary">
      <v-img src="/plane-logo.png" :width="200" alt="Web Logo"></v-img>
      <h1 class="text-primary"><b>Flights Finder</b></h1>
      <p>
        <b>Unleash Your Wanderlust! Your Ultimate Flight Finder for Soaring Adventures Worldwide.</b>
      </p>
      <p>
        <b>Discover the Cheapest Deals, Hottest Destinations, and Smoothest Takeoffs with Just One Click!</b>
      </p>
    </div>
    <SearchForm></SearchForm>
  </main>
</template>
