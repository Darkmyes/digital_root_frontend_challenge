<script setup lang="ts">
  import { ref, watch, onMounted } from 'vue'
  import { useRoute } from 'vue-router'

  import SearchForm from '@/components/SearchForm.vue'
  import FlightCard from '@/components/FlightCard.vue'

  import { useSearchStore } from '@/stores/searchStore'
  const searchStore = useSearchStore()

  const route = useRoute()

  const origin = ref('')
  const destiny = ref('')
  const departureDate = ref('')
  const returnDate = ref('')

  const getQueryParams = () => {
    origin.value = route.query.origin ? route.query.origin.toString() : ''
    destiny.value = route.query.destiny ? route.query.destiny.toString() : ''
    departureDate.value = route.query.departure ? route.query.departure.toString() : ''
    returnDate.value = route.query.return ? route.query.return.toString() : ''
  }

  const searchFlights = () => {
    searchStore.searchFlights(origin.value, destiny.value, departureDate.value, returnDate.value)
  }

  onMounted(() => {
    getQueryParams()
    searchFlights()
  })

  watch(route, async (newRoute, oldRoute) => {
    console.log("hola")
    getQueryParams()
    searchFlights()
  })
</script>

<template>
  <header class="d-flex align-center">
    <a href="/">
      <v-img src="/plane-logo.png" :width="48" style="max-width: 48px;"></v-img>
    </a>
    <h2 class="text-primary"><b>Flights Finder</b></h2>
  </header>

  <main>
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-title class="bg-primary">
          <template v-slot:default>
            <v-icon class="mr-2">mdi-magnify</v-icon>
            <b>Search</b>
          </template>
        </v-expansion-panel-title>
        <v-expansion-panel-text> 
          <SearchForm
            :origin="origin"
            :destiny="destiny"
            :departure="departureDate"
            :return-date="returnDate"
          ></SearchForm>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

    <div
      v-if="origin == '' || destiny == '' || departureDate == '' || returnDate == ''"
      class="pa-6 d-flex flex-column align-center text-secondary text-center"
    >
      <h3>You must provide some of the following parameters to fulfill the search </h3>
      <ul>
        <li v-if="origin == ''">Origin</li>
        <li v-if="destiny == ''">Destiny</li>
        <li v-if="departureDate == ''">Departure Date</li>
        <li v-if="returnDate == '' ">Return Date</li>
      </ul>
    </div>

    <div v-else>
      <div v-if="searchStore.loadingResults" class="pa-8 d-flex align-center justify-center">
        <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </div>

      <div
        v-if="!searchStore.loadingResults && searchStore.searchResults.length == 0"
        class="py-8 px-6 d-flex flex-column align-center text-secondary text-center"
      >
        <h3> No Flights were found with the data you specified </h3>
      </div>

      <v-row v-if="!searchStore.loadingResults && searchStore.searchResults.length > 0" class="pa-4">
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          xl="2"
          class="pa-2"
          v-for="flight, index in searchStore.searchResults"
          v-bind:key="index"
        >
          <FlightCard :flight="flight"/>
        </v-col>
      </v-row>
    </div>

  </main>
</template>