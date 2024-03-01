import { defineStore } from 'pinia'

export const useDonationIntentsStore = defineStore('donation-intents', {
  state: () => ({}),

  actions: {
    async getConfirmation(id) {
      const response = await this.$api.payment(`/confirmation/${id}`)
      // await new Promise((resolve) => setTimeout(resolve, 1500))
      return response?.data?.data
      return response?.data?.data || null
      console.log('done waiting')
    },
  },
});
