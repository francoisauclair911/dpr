import { defineStore } from 'pinia';


export const useHelpersStore = defineStore('helpers', {
  state: () => ({
    countries: [],
    titles: [],
  }),

  getters: {
    countriesLoaded(state) {
      return state.countries.length > 0
    },
    titlesLoaded(state) {
      return state.titles.length > 0
    },
  },
  actions: {
    async getCountries() {
      if (this.countriesLoaded) {
        return
      }

      const { data: countries } = await this.$api.country()
      this.countries = countries
    },
    async getTitles() {
      if (this.titlesLoaded) {
        return
      }

      const {
        data: { data: titles = [] },
      } = await this.$api.asset('/titles')
      this.titles = titles
    },
    // setCountries(state, countries) {
    //   state.countries = countries
    // },
    // setTitles(state, titles) {
    //   state.titles = titles
    // },
  }

});

