import { ref } from 'vue'
import { defineStore } from 'pinia'

export const surveyStore = defineStore('surveys', () => {
  const surveys = ref([])

  return { surveys }
})
