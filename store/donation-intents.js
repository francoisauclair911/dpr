import { defineStore } from 'pinia'

export const useDonationIntentsStore = defineStore('donation-intents', {
  state: () => ({}),

  actions: {
    async getConfirmation(id) {

      const { $api } = useNuxtApp()

      const response = await $api.payment(`/confirmation/${id}`)
      // await new Promise((resolve) => setTimeout(resolve, 1500))
      return response?.data || null
    },
  },
});
