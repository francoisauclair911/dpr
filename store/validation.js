import { defineStore } from "pinia"

export const useValidationStore = defineStore('validation', {
  state: () => ({
    errors: [],
  }),
  getters: {

  },
  actions: {
    handleValidation(payload) {
      const { errors } = payload
      const formattedError = Object.keys(errors).reduce((carry, error) => {
        const key = error
        const value = [errors[error].join(' ')]
        return { ...carry, [key]: value }
      }, {})
      this.errors = formattedError
    },
    clearValidationErrors() {
      if (Object.keys(this.errors).length) {
        this.errors = []
      }
    },

  },
});