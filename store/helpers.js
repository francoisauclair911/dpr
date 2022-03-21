import axios from 'axios'
export const state = () => ({
  countries: [],
})

export const getters = {
  countriesLoaded(state) {
    return state.countries.length > 0
  },
}
export const mutations = {
  SET_COUNTRIES(state, countries) {
    state.countries = countries
  },
}
export const actions = {
  async getCountries({ commit, getters }) {
    console.log('getCountries')

    if (getters.countriesLoaded) {
      console.log('countriesLoaded', true)
      return
    }
    console.log('fetching countries')

    const { data: countries } = await this.$api.country()
    commit('SET_COUNTRIES', countries)
  },
}
