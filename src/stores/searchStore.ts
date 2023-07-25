import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSearchStore = defineStore('counter', () => {
  const cities: string[] = [
    "California", "Colorado", "Florida", "Georgia", "Texas", "Wyoming"
  ]

  return { cities }
})
