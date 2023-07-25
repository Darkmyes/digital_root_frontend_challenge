import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { type Flight } from '@/domain/flight'

export const useSearchStore = defineStore('counter', () => {
  const cities: string[] = [
    "California", "Colorado", "Florida", "Georgia", "Texas", "Wyoming"
  ]

  const flightsList: Flight[] = [
    {
      id: 1,
      airline: 'Southwest Airlines',
      duration: '1:00:00',
      price: 250,
      scales: 1,
      origin: 'California',
      destiny: 'Georgia',
      departure: '2023/07/23',
      return: '2023/07/23',
    },
    {
      id: 2,
      airline: 'United Airlines',
      duration: '3:00:00',
      price: 260,
      scales: 2,
      origin: 'Florida',
      destiny: 'Georgia',
      departure: '2023/07/24',
      return: '2023/07/25',
    },
    {
      id: 3,
      airline: 'Alaska Airlines',
      duration: '3:30:00',
      price: 275,
      scales: 2,
      origin: 'Florida',
      destiny: 'Georgia',
      departure: '2023/07/23',
      return: '2023/07/26',
    },
    {
      id: 4,
      airline: 'Delta Air Lines',
      duration: '5:20:00',
      price: 250,
      scales: 3,
      origin: 'California',
      destiny: 'Georgia',
      departure: '2023/07/23',
      return: '2023/07/23',
    },
    {
      id: 5,
      airline: 'Southwest Airlines',
      duration: '6:30:00',
      price: 210,
      scales: 3,
      origin: 'California',
      destiny: 'Georgia',
      departure: '2023/07/24',
      return: '2023/07/25',
    },
    {
      id: 6,
      airline: 'JetBlue',
      duration: '1:48:00',
      price: 260,
      scales: 3,
      origin: 'California',
      destiny: 'Georgia',
      departure: '2023/07/23',
      return: '2023/07/23',
    },
    {
      id: 7,
      airline: 'Spirit Airlines',
      duration: '2:40:00',
      price: 250,
      scales: 3,
      origin: 'Colorado',
      destiny: 'Georgia',
      departure: '2023/07/23',
      return: '2023/07/23',
    },
    {
      id: 8,
      airline: 'Southwest Airlines',
      duration: '3:00:00',
      price: 280,
      scales: 3,
      origin: 'California',
      destiny: 'Georgia',
      departure: '2023/07/23',
      return: '2023/07/23',
    },
    {
      id: 9,
      airline: 'Southwest Airlines',
      duration: '7:00:00',
      price: 350,
      scales: 3,
      origin: 'Texas',
      destiny: 'Georgia',
      departure: '2023/07/23',
      return: '2023/07/23',
    },
    {
      id: 10,
      airline: 'Southwest Airlines',
      duration: '7:00:00',
      price: 300,
      scales: 3,
      origin: 'Colorado',
      destiny: 'Georgia',
      departure: '2023/07/23',
      return: '2023/07/23',
    },
    {
      id: 11,
      airline: 'Southwest Airlines',
      duration: '2:00:00',
      price: 305,
      scales: 3,
      origin: 'Texas',
      destiny: 'Colorado',
      departure: '2023/07/23',
      return: '2023/07/23',
    },
    {
      id: 12,
      airline: 'Southwest Airlines',
      duration: '5:00:00',
      price: 320,
      scales: 3,
      origin: 'California',
      destiny: 'Texas',
      departure: '2023/07/23',
      return: '2023/07/23',
    },
    {
      id: 13,
      airline: 'Southwest Airlines',
      duration: '16:00:00',
      price: 180,
      scales: 3,
      origin: 'Wyoming',
      destiny: 'Texas',
      departure: '2023/07/23',
      return: '2023/07/23',
    }
  ]

  const loadingResults = ref<boolean>(false)
  const setLoadingState = (boolState: boolean) => {
    loadingResults.value = boolState
  }

  const searchResults = ref<Flight[]>([])
  const relatedResults = ref<Flight[]>([])

  const searchFlights = (origin: string, destiny: string, departureDate: string, returnDate: string) => {
    setLoadingState(true)

    searchResults.value = flightsList.filter((flight => {
      if (flight.origin.toLowerCase() !== origin.toLowerCase()) {
        return false
      }
      if (flight.destiny.toLowerCase() !== destiny.toLowerCase()) {
        return false
      }
      if (flight.departure.toLowerCase().replaceAll('/', '-') !== departureDate.toLowerCase().replace(RegExp('/'), '-')) {
        return false
      }
      if (flight.return.toLowerCase().replaceAll('/', '-') !== returnDate.toLowerCase().replace(RegExp('/'), '-')) {
        return false
      }

      return true
    }))

    relatedResults.value = flightsList
      .filter(flight => searchResults.value.findIndex(flightInSearch => flightInSearch.id === flight.id) < 0)
      .filter((flight => {
          if (flight.origin.toLowerCase() !== origin.toLowerCase()) {
            return false
          }
          if (flight.destiny.toLowerCase() !== destiny.toLowerCase()) {
            return false
          }

          return true
        })
      )

    setTimeout(
      () => {
        setLoadingState(false)
      },
      350
    )
  }

  return { cities, searchResults, relatedResults, loadingResults, searchFlights }
})
