import { defineStore } from "pinia"

export const useUtmsStore = defineStore('utms', {
  state: () => ({
    utms: {
      medium: null,
      source: null,
      campaign: null,
      content: null,
      term: null,
    },
  }),
  getters: {

  },
  actions: {

    parseURL(route) {
      this.setUTM(['medium', route.query.utm_medium])
      this.setUTM(['source', route.query.utm_source])
      this.setUTM(['content', route.query.utm_content])
      this.setUTM(['campaign', route.query.utm_campaign])
      if (route.query.utm_term) {
        this.setUTM(['term', route.query.utm_term.split(' ')])
      }
    },

    setUTM([key, value = null]) {
      this.utms[key] = value
    },
  },
});